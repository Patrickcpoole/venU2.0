import {API, graphqlOperation, Storage} from "aws-amplify"
import {mapGetters} from 'vuex';
import {listUserShowInteractions} from "src/graphql/queries";
import {createVenue as createVenueMutation} from "src/graphql/mutations";
import {createUserShowInteraction, deleteUserShowInteraction} from "src/graphql/mutations";
import {authState} from "src/mixins/authState";


export async function checkAllInteractions({commit}) {
  const user = this.getters['auth/user'];
  console.log('checking interactions', user.id)
  const allInteractions = await API.graphql(
    graphqlOperation(listUserShowInteractions, {
      filter: {
        userId: {
          eq: user.id
        },

      }
    }));

  commit("setInteractions", allInteractions.data.listUserShowInteractions.items)

  const goingConcertsInteractions = allInteractions.data.listUserShowInteractions.items.filter(interaction => interaction.status === 'GOING');
  const interestedConcertsInteractions = allInteractions.data.listUserShowInteractions.items.filter(interaction => interaction.status === 'INTERESTED');
  const undergroundPostInteractions = allInteractions.data.listUserShowInteractions.items.filter(interaction => interaction.status === 'UNDERGROUND');

  const allConcerts = this.getters['concerts/concerts'];
  const goingConcerts = allConcerts.filter(concert =>
    goingConcertsInteractions.some(interaction =>
      interaction.concertId === concert.id
    )
  );

  const interestedConcerts = allConcerts.filter(concert =>
    interestedConcertsInteractions.some(interaction =>
      interaction.concertId === concert.id
    )
  );

  const allPosts = this.getters['underground/posts'];
  const undergroundPosts = allPosts.filter(post =>
    undergroundPostInteractions.some(interaction =>
      interaction.concertId === post.id
    )
  );
  commit("setInterestedConcerts", interestedConcerts)
  commit("setGoingConcerts", goingConcerts)
  commit("setUndergroundPosts", undergroundPosts)
}

export async function saveUndergroundPostInteraction({commit}, data) {
  const user = this.getters['auth/user'];
  console.log('saving underground post interaction', data)

  const interactionRequest = {
    userId: user.id,
    concertId: data.id,
    status: "UNDERGROUND",
  };

  try {
    const interaction = await API.graphql(graphqlOperation(createUserShowInteraction, {input: interactionRequest}));
    commit('saveInteraction', interaction.data.createUserShowInteraction);
    commit('saveUndergroundPost', data);
  } catch (error) {
    console.log("Create User Interaction Error", error);
  }
}

export async function saveConcertInteraction({commit, getters}, {data, status}) {
  const user = this.getters['auth/user'];
  console.log('saving interaction', data, status)

  const interactionRequest = {
    userId: user.id,
    concertId: data.id,
    status,
  };

  try {
    const interaction = await API.graphql(graphqlOperation(createUserShowInteraction, {input: interactionRequest}));
    const storeStatus = status === "GOING" ? 'going' : 'interested';
    console.log('saving interaction', data, storeStatus)
    commit('saveInteraction', interaction.data.createUserShowInteraction);
    commit('saveConcert', {status: storeStatus, payload: data});
  } catch (error) {
    console.log("Create User Interaction Error", error);
  }
}

export async function removeConcertInteraction({commit, state}, {data, status}) {


  const interactionToDelete = state.interactions.find(
    interaction =>  interaction.concertId === data.id
  );

  if (!interactionToDelete) {
    console.error('Interaction not found for deletion');
    return;
  }

  const interactionRequest = {
    id: interactionToDelete.id, // Assuming the id property exists on the interaction object
  };

  try {
    await API.graphql(graphqlOperation(deleteUserShowInteraction, {input: interactionRequest}));
    const storeStatus = status === "GOING" ? 'going' : 'interested';
    commit('removeInteraction', interactionToDelete);
    commit('removeConcert', {status: storeStatus, payload: data});
  } catch (error) {
    console.log("Create Venue Error", error);
  }
}

export async function removeUndergroundPostInteraction({commit, state}, data) {

  console.log('removing underground post interaction', data)
   const interactionToDelete = state.interactions.find(
    interaction =>  interaction.concertId === data.id
  );

  if (!interactionToDelete) {
    console.error('Interaction not found for deletion');
    return;
  }

  const interactionRequest = {
    id: interactionToDelete.id, // Assuming the id property exists on the interaction object
  };

  try {
    await API.graphql(graphqlOperation(deleteUserShowInteraction, {input: interactionRequest}));
    commit('removeUndergroundPost', data);
    commit('removeInteraction', interactionToDelete);
  } catch (error) {
    console.log("Create Venue Error", error);
  }
}



