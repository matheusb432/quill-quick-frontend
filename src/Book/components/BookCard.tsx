export function BookCard() {
  return (
    <div class="relative h-72 w-56 shadow-lg">
      <article
        class="absolute flex justify-between h-full w-full border-4 
     flex-col items-center bg-black-500 border-green-700 z-20 
     border-l-0 rounded-md"
      >
        <header class="p-2">
          <h2 class="text-2xl font-semibold capitalize">Really long book title etc</h2>
        </header>
        <div>
          <button>Review Quill</button>
        </div>
        <footer class={'flex w-full p-2 gap-x-2 justify-between items-center '}>
          Icon
          <i>Stars</i>
        </footer>
      </article>
      <div
        class="
  absolute bg-green-300 h-full w-full scale-105 
  left-1 top-2 border-4 z-10
    border-green-700 rounded-md"
      />
    </div>
  );

  /* <div
    class="
  absolute bg-white h-full w-full scale-110 
  left-4 top-[10px] border-r-2  border-t-2 pt-5
  border-b-2 border-green-500 rounded-r-md"
  /> */
}
