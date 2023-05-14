<template>
    <div class="create-post-container">
        <div class="create-post-form">
            <div class="top">
                <span class="title">Create new post</span>
                <img src="../assets/img/cross.svg" @click="$router.push('/')" class="close-button">
            </div>

            <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
                <div v-if="!preview.visibility" class="content-drop-container" @dragover.prevent @drop.prevent="handleDrop">
                    <div class="text">Drag and drop your content or <span @click="contentContainer.click()" class="browse-files">browse files</span></div>
                    <input @change="handleChange" accept="image/*" class="content" ref="contentContainer" type="file">
                </div>

                <div class="content-preview" v-else>
                    <img ref="previewImage" :src="preview.url" class="preview">
                    <img :src="preview.url" class="preview-blur">
                </div>

                <textarea rows="4" type="text" class="post-description" placeholder="Describe your future post..." v-model="formData.Description"></textarea>
                <input type="text" class="tags" placeholder="Add tags..." disabled>

                <div class="bottom">
                    <select v-model="formData.Type">
                        <option>Photo</option>
                        <option>Art</option>
                    </select>

                    <select v-model="formData.Category">
                        <option>Other</option>
                        <option>Animals</option>
                        <option>Anime</option>
                        <option>Nature</option>
                        <option>Street</option>
                        <option>People</option>
                    </select>

                    <Button :text="'Create post'" type="submit"></Button>
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts" setup>

import { onMounted, onUnmounted, reactive, ref } from 'vue';
import Button from '../components/ui/Button.vue';
import { postService } from '../services/postService';
import { router } from '../router';
import { store } from '../store';

const formData = reactive({
    Description: '',
    Content: new File([''], ''),
    Orientation: '',
    Type: 'Photo',
    Category: 'Other',
    Tags: ''
});

const preview = reactive({
    visibility: false,
    url: ''
});

const contentContainer = ref({} as HTMLInputElement); 
const previewImage = ref({} as HTMLImageElement);

const handleSubmit = async () => {
    determineContentOrientation();

    const data = new FormData();

    data.append('Description', formData.Description);
    data.append('Content', formData.Content);
    data.append('Category', formData.Category);
    data.append('Type', formData.Type);
    data.append('Orientation', formData.Orientation);
    data.append('Tags', '[]');
    
    router.push('/');
    await postService.create(data);
    await store.dispatch('fetchPosts', {});
}

onMounted(() => {
    document.body.style.overflow = 'hidden';
});

onUnmounted(() => {
    document.body.style.overflow = 'auto';
}); 

const handleDrop = (event: DragEvent) => setContent(event.dataTransfer?.files);
const handleChange = () => setContent(contentContainer.value.files as FileList);

const determineContentOrientation = () => {
    const width = previewImage.value.clientWidth;
    const height = previewImage.value.clientHeight;

    formData.Orientation  = (width > height) && "Landscape" || (width < height) && "Portrait" || "Squarish"; 
}

const setContent = (files?: FileList) => {
    if (files != undefined) {
        const content: File = files[0];
        contentContainer.value.files = files;
        formData.Content = content;

        showPreview(content);       
    }
}

const showPreview = (content: File) => {
    preview.visibility = true;
    preview.url = URL.createObjectURL(content);
}

</script>

<style lang="scss">

@import "../assets/styles/variables.scss";
@import "../assets/styles/mixins.scss";

.create-post-container {
    position: absolute;
    width: 100%;
    height: 100vh;
    display: grid;
    place-content: center;
    top: 30px;
    z-index: 10;
    backdrop-filter: brightness(0.5);

    .create-post-form {
        width: 460px;
        height: 790px;
        background-color: rgb(255, 255, 255);
        border-radius: 16px;
        padding: 15px 20px;
        box-sizing: border-box;
        position: relative;

        .top {
            width: 100%;
            display: flex;
            align-items: center;

            .title {
                @include set-font($primary-font-family, 16px, 500);
            }   

            .close-button {
                order: 2;
                margin-left: auto;
                cursor: pointer;
            }
        }

        .content-drop-container {
            width: 100%;
            height: 475px;
            margin: 20px 0;
            border-radius: 12px;
            display: grid;
            place-content: center;
            border: 1px rgb(159, 159, 159) dashed;

            .text {
                font-weight: 500;
                color: rgb(95, 95, 95);

                .browse-files {
                    cursor: pointer;
                    text-decoration: underline;
                }
            }

            .content {
                display: none;
            }
        }

        input, textarea {
            width: 100%;
            background-color: rgb(242, 242, 242);
            border-radius: 12px;
            padding: 10px;
            box-sizing: border-box;
            overflow: hidden;
            resize: none;
            @include set-font($primary-font-family, 14px, 500);
            @include no-border-outline;
        }

        input {
            margin-top: 10px;
        }

        .content-preview {
            width: 100%;
            height: 475px;
            display: grid;
            place-content: center;
            overflow: hidden;
            position: relative;
            margin: 20px 0;
            border-radius: 12px;
            padding: 15px;
            box-sizing: border-box;

            .preview {
                width: 100%;
                max-height: 440px;
                object-fit: cover;
                border-radius: 12px;
                z-index: 10;
            }

            .preview-blur {
                width: 100%;
                height: 100%;
                position: absolute;
                object-fit: cover;
                filter: blur(200px) brightness(0.8);
            }
        }

        .bottom {
            display: flex;
            align-items: center;
            column-gap: 10px;
            margin-top: 20px;

            select {
                border: 1px solid rgb(163, 163, 163);
                padding: 6px 20px;
                border-radius: 30px;
                text-align: center;
                outline: none;

                @include set-font($primary-font-family, 14px, 500);
            }

            button {
                padding: 6px 20px;
                margin-left: auto;
                order: 2;
            }
        }
    }
}

@media screen and (max-width: 501px) {
    .create-post-container {
        .create-post-form {
            width: 100%;
            height: 100%;
            border-radius: 0;
        }
    }
}

</style>