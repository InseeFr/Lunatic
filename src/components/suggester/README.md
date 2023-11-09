# How it work ?

To know the limitation of the suggester and how to add feature I had to explore the code. 
The goal of this document is to share my understanding of what happens when you search something.

## The Search

When searching within a suggester, a message is sent to the worker registered by lunatic (`lunatic-search-worker-XXX.js`) with the data

```json
{
  "search": "My Search",
  "name": "naf-rev2",
  "version": "1"
}
```

The worker (via [searching.js](https://github.com/InseeFr/Lunatic/blob/2.7/src/utils/suggester-workers/searching/searching.js#L55-L67)) will parse the query into tokens (one for each word for instance). For each token it will search in the "store/entities/index" every row starting with this token. You can try this code in the console to see how a token is matched.

```js
indexedDB.open("naf-rev2", 1).onsuccess = (e) => {
    const search = "32" // Change this to try a new search
    const db = e.target.result
    console.log(Array.from(db.objectStoreNames))
    const transaction = db.transaction(
        "store/entities",
        "readonly"
    )
    const max = String.fromCharCode(65535)
    const store = transaction.objectStore('store/entities')
    const index = store.index("store/entities/index")
    const range = IDBKeyRange.bound(search, search + max)
    index.getAll(range).onsuccess = (req) => {
        console.log(req.target.result)
    }
}
```

When all the results are fetched, they are sorted by score (or using an adaptation of meloto ranking system) before being returned to the suggester.

## Indexation

When indexing data a JSON is converted into an IndexDB with 2 stores : 

- `store/info`, saves info about the data (name, fields, queryParser, version...)
- `store/entities`, saves every item of the JSON 

For the second store, an index is created based on the token used for every suggestion. For instance "Hello world" will be indexed at "hello" and "world". This index will be used during the search to find every record matching a specific string. To avoid having a too bing index tokens are reduced using multiple operations :

- Lowercased
- Accents are removed
- Words are simplified using stemming algorithm like snowball (we remove suffix)
