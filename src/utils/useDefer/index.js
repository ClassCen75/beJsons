import { onUnmounted, ref } from 'vue';

export function useDefer(maxNum = 100) {
  const count = ref(0);
  let refId;
  function increment() {
    refId = requestAnimationFrame(() => {
      count.value++;
      if (count.value >= maxNum) {
        return;
      }
      increment();
    });
  }
  increment();

  onUnmounted(() => {
    cancelAnimationFrame(refId);
    console.log('cancel');
  });
  return function (n) {
    return count.value >= n;
  };
}
