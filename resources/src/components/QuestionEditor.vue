<template>
    <div class="flex items-center justify-between">
        <h3 class="text-lg font-bold">
            {{ index + 1 }}. {{ model.question }}
        </h3>

        <div class="flex items-center">
            <button type="button" @click="addQuestion()" class="flex items-center text-xs py-1 px-3 mr-2 rounded-sm text-white bg-gray-600 hover:bg-gray-700">
                Add
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </button>
            <button type="button" @click="deleteQuestion()" class="flex items-center text-xs py-1 px-3 rounded-sm border border-transparent text-red-500 hover:border-red-600">
                Delete
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
        </div>
    </div>
    <div class="grid gap-3 grid-cols-12">
        <div class="mt-3 col-span-9">
            <label :for="'question_text_' + model.data" class="block text-sm font-medium text-gray-700">
                Question Text
            </label>
            <input type="text" :name="'question_text_' + model.data" v-model="model.question" @change="dataChange" :id="'question_text_' + model.data" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
        </div>
        <div class="mt-3 col-span-3">
            <label for="question_type" class="block text-sm font-medium text-gray-700">
                Select Question Type
            </label>
            <select id="question_type" name="question_type" v-model="model.type" @change="typeChange" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <option v-for="type in questionTypes" :key="type" :value="type">
                    {{ upperCaseFirst(type) }}
                </option>
            </select>
        </div>
    </div>
    <div class="mt-3 col-span-9">
        <label :for="'question_description_' + model.id" class="block text-sm font-medium text-gray-700">
            Description
        </label>
        <textarea :name="'question_description_' + model.id" v-model="model.description" @change="dataChange" :id="'question_description_' + model.id" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
        </textarea>
    </div>
    <hr class="my-4" />
</template>

<script setup>

    import { ref } from "vue";

    const props = defineProps({
        question: Object,
        index: Number
    });

    const emit = defineEmits(["change", "addQuestion", "deleteQuestion"]);

    const model = ref(JSON.parse(JSON.stringify(props.question)));

</script>

<style>

</style>
