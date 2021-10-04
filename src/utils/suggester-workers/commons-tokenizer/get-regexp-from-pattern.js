function get(pattern) {
  if (typeof pattern === 'string') {
    return new RegExp(pattern);
  }
  return pattern;
}

export default get;
