<template>
  <div class="py-10">
    <div v-if="!notes.length" class="flex sm:flex-row flex-col items-center sm:my-10 my-20 px-5">
      <img src="~@/assets/notes.svg" alt="notes image" class="sm:w-1/2" />
      <p class="sm:text-3xl mx-10">
        You have no notes, click the
        <span class="font-bold">+ button</span> at the top to begin.
      </p>
    </div>
    <div v-else v-for="(note,index) in notes" :key="index" class="bg-blue-800 rounded mt-3 p-4">
      <h2>{{note.title}}</h2>
      <p>{{note.content}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Note",
  data() {
    return {
      notes: [
        // {
        //   title: "bla bal bla",
        //   content:
        //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, accusamus!",
        // },
        // {
        //   title: "bla bal bla",
        //   content:
        //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, accusamus!",
        // },
        // {
        //   title: "bla bal bla",
        //   content:
        //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, accusamus!",
        // },
      ],
    };
  },
};
</script>

