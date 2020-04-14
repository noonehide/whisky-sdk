function isSuportPerformance ():boolean {
  return (
    window.performance &&
    !!performance.getEntriesByType &&
    !!performance.now &&
    !!performance.mark
  );
}

function isSuportPerformanceObserver ():boolean {
  return (window as any).chrome && 'PerformanceObserver' in window;
}

function each (collection: any, callback: any) {
  let value
  let i:any = 0
  let length = collection.length

  if (Array.isArray(collection)) {
    for ( ; i < length; i++ ) {
      value = callback.call(collection[i], collection[i], i);
      if (value === false) {
          break;
      }
  }
 } else {
    for (i in collection) {
      value = callback.call(collection[i], collection[i], i);
      if ( value === false ) {
          break;
      }
    }
 }
 return collection
}
export default {
  each,
  isSuportPerformance,
  isSuportPerformanceObserver,
}
