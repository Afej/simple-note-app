<template>
  <div class="bg-blue-900 text-white min-h-screen m-0 relative">
    <div class="container mx-auto xl:px-0 px-5">
      <!-- header -->
      <header class="flex justify-between items-center py-3 border-b-2 border-white">
        <h1 class="sm:text-5xl text-4xl">Di Notes</h1>

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
      </header>

      <!-- Notes Section -->
      <div class="py-10">
        <div v-if="!notes.length" class="flex sm:flex-row flex-col items-center my-10 px-5">
          <img src="~@/assets/notes.svg" alt="notes image" class="sm:w-1/2" />
          <p class="sm:text-3xl text-xl mx-10 text-center">
            You have no notes,
            <br />click the
            <span class="font-bold cursor-pointer" @click="createNote">+ button</span> at the top to begin.
          </p>
        </div>
        <div v-else class="grid sm:grid-cols-3 grid-cols-1 gap-4 my-8">
          <div
            class="bg-blue-800 rounded my-3 p-4 min-h-full sm:h-56 h-40 relative"
            v-for="(note,index) in notes"
            :key="index"
          >
            <div @click="displayNote(index)">
              <h2>{{note.title}}</h2>
              <p class="break-all" v-html="note.content"></p>
            </div>
            <span class="absolute bottom-0 right-0 mx-5 my-3">
              <i class="fas fa-trash-alt cursor-pointer" @click="deleteNote(index)"></i>
            </span>
          </div>
        </div>
      </div>

      <!-- modal for creating notes -->
      <div v-show="modal">
        <div class="modal-container fixed inset-0 bg-black bg-opacity-50" id="modal-container">
          <div
            class="modal absolute overflow-hidden bg-white rounded-md shadow-xl m-h-full max-w-full w-4/5 md:w-8/12 lg:w-6/12"
          >
            <button
              class="close-btn absolute top-0 right-0 mr-5 mt-2 appearance-none"
              @click="closeModal"
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
                  v-model="currentNote.title"
                />
              </div>
              <div class="my-4">
                <ckeditor
                  :editor="editor"
                  @ready="onReady"
                  v-model="currentNote.content"
                  :config="editorConfig"
                  class="appearance-none border-none w-full text-gray-700 py-1 px-2 leading-tight h-64"
                  placeholder="Enter your contents"
                ></ckeditor>
                <!-- <wysiwyg v-model="currentNote.content" class="text-black" /> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer class="absolute bottom-0 inset-x-0 pb-5 text-center">
      <p>Copyright &copy; 2020 Afej</p>
    </footer>
  </div>
</template>

<script>
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";

export default {
  name: "App",
  components: {},
  data() {
    return {
      notes: [],
      currentNote: {
        title: "",
        content: "",
      },
      currentIndex: null,
      modal: false,
      editor: DecoupledEditor,
      // editorData: "",
      editorConfig: {
        // The configuration of the editor.
      },
    };
  },
  mounted() {
    if (localStorage.notes) {
      this.notes = JSON.parse(localStorage.notes);
    }
  },
  watch: {
    notes(newNotes) {
      localStorage.notes = JSON.stringify(newNotes);
    },
  },
  methods: {
    //this opens the modal with note editor
    createNote() {
      // this.modal = true;
      this.notes.unshift({
        title: "Untitled note",
        content: "Click to edit contents...",
      });
    },
    // this displays the note in the note editor
    displayNote(index) {
      this.modal = true;
      this.currentNote = this.notes[index];
      this.currentIndex = index;
      console.log(this.currentIndex, "editing");
    },
    // exiting the note editor
    closeModal() {
      this.modal = false;

      // if (this.currentIndex == null) {
      //   this.notes.unshift(this.currentNote);
      //   this.currentIndex = this.notes.length - 1;
      // } else if (this.notes.length > this.currentIndex) {
      //   this.notes.unshift(this.currentNote);
      //   this.currentIndex = this.notes.length - 1;
      //   // this.notes.splice(this.currentIndex, 0, this.currentNote);
      //   console.log("inseerting");
      // }

      // if (this.currentIndex == this.notes[this.currentIndex]) {
      //   this.notes.splice(this.currentIndex, 1, this.currentNote);
      //   console.log("replacing");
      // }
      if (this.currentNote.title === "" && this.currentNote.content === "") {
        this.modal = false;
        this.notes.splice(this.currentIndex, 1);
        this.currentIndex = this.notes.length - 1;
        console.log("empty dets");
      }

      localStorage.notes = JSON.stringify(this.notes);
    },
    deleteNote(index) {
      this.notes.splice(index, 1);
      localStorage.notes = JSON.stringify(this.notes);
    },
    onReady(editor) {
      // Insert the toolbar before the editable area.
      editor.ui
        .getEditableElement()
        .parentElement.insertBefore(
          editor.ui.view.toolbar.element,
          editor.ui.getEditableElement()
        );
    },
  },
};
</script>

<style  scoped>
/* @import "~vue-wysiwyg/dist/vueWysiwyg.css"; */

.modal {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>


