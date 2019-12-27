export default (children = []) =>
  (Array.isArray(children) ? children : [children]).map(child => {
    const { value } = child.props;
    const label = child.props.children;
    if (label === undefined || value === undefined) {
      throw new Error("Ooops");
    }
    return { label, value };
  });
