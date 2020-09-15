<template>
  <div class="bg-blue-900 text-white min-h-screen">
    <div class="container mx-auto xl:px-0 px-5">
      <!-- header -->
      <div class="flex justify-between items-center py-3 border-b-2 border-white">
        <h1 class="sm:text-5xl text-4xl">My Notes</h1>

        <!--  Add note icon -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          width="30px"
          height="30px"
          @click="createNote"
          class="cursor-pointer"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path
            d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 14h-3v3h-2v-3H8v-2h3v-3h2v3h3v2zm-3-7V3.5L18.5 9H13z"
          />
        </svg>
      </div>

      <!-- Notes Section -->
      <div class="py-10">
        <div
          v-if="!notes.length"
          class="flex sm:flex-row flex-col items-center sm:my-10 my-20 px-5"
        >
          <img src="~@/assets/notes.svg" alt="notes image" class="sm:w-1/2" />
          <p class="sm:text-3xl text-xl mx-10 text-center">
            You have no notes,
            <br />click the
            <span class="font-bold cursor-pointer" @click="createNote">+ button</span> at the top to begin.
          </p>
        </div>
        <div v-else v-for="(note,index) in notes" :key="index" class="bg-blue-800 rounded mt-3 p-4">
          <h2>{{note.title}}</h2>
          <p>{{note.content}}</p>
        </div>
      </div>

      <!-- modal for creating notes -->
      <div v-show="modal">
        <div class="modal-container fixed inset-0 bg-black bg-opacity-50">
          <div
            class="modal absolute overflow-hidden bg-white rounded-md shadow-xl m-h-full max-w-full w-4/5 md:w-8/12 lg:w-6/12"
          >
            <button
              class="close-btn absolute top-0 right-0 mr-5 mt-2 appearance-none"
              @click="close"
            >
              <i class="fa fa-times text-2xl text-red-500"></i>
            </button>

            <div class="modal-content p-4">
              <div class="border-b border-blue-500 py-2 my-4">
                <input
                  class="appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none"
                  type="text"
                  placeholder="Title"
                  aria-label="title"
                />
              </div>
              <div class="my-4">
                <textarea
                  class="appearance-none border-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none h-64"
                  placeholder="Enter your notes"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Notes from "@/components/Notes";

export default {
  name: "App",
  components: {},
  data() {
    return {
      notes: [
        // {
        //   title: "bla bal bla",
        //   content:
        //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, accusamus!",
        // },
      ],
      modal: false,
    };
  },
  methods: {
    createNote() {
      this.modal = true;
    },
    close() {
      this.modal = false;
    },
  },
};
</script>

<style  scoped>
.modal {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>


