<template>
    <PageComponent>
        <template v-slot:header>
            <div class="flex justify-between items-center">
                <h1 class="text-3xl font-bold text-gray-900">Surveys</h1>
                <router-link :to="{name: 'SurveyCreate'}" class="py-2 px-3 text-white bg-emerald-500 rounded-md hover:bg-emerald-600">
                    New Survey
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 -mt-1 inline-block">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                </router-link>
            </div>
        </template>
    <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
        <SurveyListItem v-for="(survey, index) in surveys" :key="survey.id" :survey="survey" class="opacity-0 animate-fade-in-down" :style="{animationDelay: `${index * 0.07}s`}" @delete="deleteSurvey(survey)" />
    </div>
    </PageComponent>
</template>

<script setup>
    import PageComponent from "../layouts/PageComponent.vue";
    import SurveyListItem from "./SurveyListItem.vue";
    import { useStore } from "vuex";
    import { computed } from "vue";

    const store = useStore();

    const surveys = computed(() => store.state.surveys.data);

    store.dispatch('getSurveys');

    function deleteSurvey(survey) {
        if (confirm(`Are you sure you want to delete this survey? Operation can't be undone`)) {
            store.dispatch('deleteSurvey', survey.id)
                .then(() => {
                    store.dispatch('getSurveys');
                });
        }
    };

</script>

<style>

</style>
