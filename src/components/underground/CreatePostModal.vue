<!-- CreatePostDialog.vue -->
<template>
  <q-dialog v-model="showDialog" @hide="resetForm" transition-show="rotate" transition-hide="rotate">
    <q-card dark class=" q-pa-sm q-pt-md" style="background-color:#555; ">

      <span class="text-h6" style="padding-left: 15px;">Create Post</span>


      <q-card-section>
        <!-- Your form goes here -->
        <q-form @submit.prevent="submitForm" dark class="flex column">
          <!-- Add form fields for post creation -->
          <q-input v-model="createPostData.text" hint="required" type="textarea" label="Post Text" dark/>

          <!-- Add fields for photo or video URL -->


          <!-- Conditionally render the input fields based on the selected media type -->
          <div class="q-mt-md">
            <q-btn
              label="Add Media"
              icon="perm_media"
              color="primary"
              v-if="!toggleMediaOptions && mediaType === null"
              @click="toggleMediaOptions = !toggleMediaOptions"/>
            <div v-if="toggleMediaOptions && mediaType === null">
              Media Type:
              <q-option-group
                name="media_type"
                v-model="mediaType"
                :options="mediaOptions"
                color="primary"
                inline
                dark
              />
            </div>
            <div class="flex">
              <q-input v-if="mediaType === 'photo' " v-model="createPostData.photoUrl" style="width: 90%"
                       label="Photo URL"
                       dark/>

              <q-input v-if="mediaType === 'video'" v-model="createPostData.videoUrl" style="width: 90%"
                       label="Video URL"
                       dark/>
              <q-btn v-if="mediaType !== null" icon="close" flat color="primary" style="width: 10%"
                     @click="mediaType = null; toggleMediaOptions=false"/>
            </div>
          </div>

          <!-- Add field for ticket URL -->
          <div class="q-mt-md">
            <div class="flex">
              <q-input v-model="createPostData.ticketUrl" v-if="toggleTicketLink" label="Ticket URL" dark
                       style="width: 90%"/>
              <q-btn v-if="toggleTicketLink" icon="close" flat color="primary" style="width: 10%"
                     @click="toggleTicketLink = !toggleTicketLink"/>
            </div>
            <q-btn v-if="!toggleTicketLink" label="Add Ticket Link" icon="local_activity" color="primary"
                   @click="toggleTicketLink = !toggleTicketLink"/>
          </div>
          <!-- Add date picker -->

          <div class=" flex column items-center">
            <div class="flex justify-between full-width q-mt-lg" v-if="showTimePicker">
              <span class="text-h6 q-mr-lg">Date: {{ createPostData.eventDate }}</span>
              <q-btn @click="showTimePicker = false" icon="edit_calendar" class="q-ml-lg" label="Edit Date"
                     color="primary"/>
            </div>
            <q-date v-model="createPostData.eventDate" mask="YYYY-MM-DD HH:mm" class="q-mt-lg" v-if="!showTimePicker" label="Event Date"
                    @input="onDateSelected" dark/>

            <!-- Conditionally render time picker after date selection -->
            <q-time v-if="showTimePicker" class="q-mt-lg" mask="YYYY-MM-DD HH:mm" v-model="createPostData.eventDate" label="Event Time" dark/>
          </div>

          <q-btn label="Create Post" class="q-mt-md" color="primary" type="submit"/>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'CreatePostModal',
  props: {
    toggleCreatePost: {
      type: Boolean,
      required: true,
    },
  },
  watch: {
    toggleCreatePost(newVal) {
      this.showDialog = newVal;
    },
  },
  data() {
    return {
      mediaOptions: [
        {
          label: 'Photo',
          value: 'photo'
        },
        {
          label: 'Video',
          value: 'video'
        },

      ],
      mediaType: null,
      toggleMediaOptions: false,
      toggleTicketLink: false,
      showDialog: this.toggleCreatePost,
      showTimePicker: false, // Variable to control time picker visibility
      createPostData: {
        userName: '',
        text: '',
        photoUrl: null,
        videoUrl: null,
        ticketUrl: '',
        eventDate: null
        // Add other fields based on your post schema
      },
    };
  },
  methods: {
    onDateSelected() {
      // Show the time picker after the date is selected
      this.showTimePicker = true;
    },
    resetForm() {
      this.$emit('closeModal')
      // Reset form data when the dialog is closed
      this.createPostData = {

        text: '',
        photoUrl: '',
        videoUrl: '',
        ticketUrl: '',
        eventDate: null,

        // Reset other fields as needed
      };
    },
    submitForm() {
      // Check for required fields
      if (!this.createPostData.eventDate || !this.createPostData.text) {
        // Display error notification
        this.$q.notify({
          color: 'negative',
          position: 'top',
          message: 'Text and event date are required fields.',
        });
        return; // Stop the form submission if required fields are not present
      }

      const postData = {
        ...this.createPostData,
        eventDate: new Date(this.createPostData.eventDate).toISOString(),
      };

      // Dispatch the action to create a post
      this.$store.dispatch('underground/createPost', postData);

      // Close the dialog after submitting
      this.showDialog = false;
    },
  },
};
</script>
