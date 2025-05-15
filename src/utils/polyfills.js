// Simple Promise.withResolvers polyfill
if (!Promise.withResolvers) {
  Object.defineProperty(Promise, "withResolvers", {
    value: function () {
      const out = {};
      out.promise = new Promise((resolve, reject) => {
        out.resolve = resolve;
        out.reject = reject;
      });
      return out;
    },
  });
}
