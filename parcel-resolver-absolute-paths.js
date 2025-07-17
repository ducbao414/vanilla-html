import { Resolver } from '@parcel/plugin';

export default new Resolver({
  async resolve({ dependency, options, filePath }) {
    // Check the original specifier from source code
    if (!dependency.isEntry && dependency.specifier && dependency.specifier.startsWith("/")) {
      return { isExcluded: true };
    }
    return null;
  }
});