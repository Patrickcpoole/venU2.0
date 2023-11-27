import {API, graphqlOperation, Storage} from "aws-amplify"
import { mapGetters } from 'vuex';
import { listUserShowInteractions} from "src/graphql/queries";
import {createVenue as createVenueMutation} from "src/graphql/mutations";
import {createUserShowInteraction, deleteUserShowInteraction} from "src/graphql/mutations";
import {authState} from "src/mixins/authState";



export async function checkAllInteractions({commit}) {
  const user = this.getters['auth/user'];
  console.log('checking interactions', user.id)
  const interestedConcertsInteractions = await API.graphql(
    graphqlOperation(listUserShowInteractions, {
      filter: {
        userId: {
          eq: user.id
        },
        status: {
          eq: "INTERESTED"
        }
      }
    }));
  const goingConcertsInteractions = await API.graphql(
    graphqlOperation(listUserShowInteractions, {
      filter: {
        userId: {
          eq: user.id
        },
        status: {
          eq: "GOING"
        }
      }
    }));
  const allConcerts = this.getters['concerts/concerts'];
  const goingConcerts = allConcerts.filter(concert =>
  goingConcertsInteractions.data.listUserShowInteractions.items.some(interaction =>
    interaction.concertId === concert.id
  )
);

const interestedConcerts = allConcerts.filter(concert =>
  interestedConcertsInteractions.data.listUserShowInteractions.items.some(interaction =>
    interaction.concertId === concert.id
  )
);
  commit("setInterestedConcerts", interestedConcerts)
  commit("setGoingConcerts", goingConcerts)
}



export async function saveConcertInteraction({ commit, getters }, { data, status }) {
  const user = this.getters['auth/user'];
  console.log('saving interaction', data, status)

  const interactionRequest = {
    userId: user.id,
    concertId: data.id,
    status,
  };

  try {
    await API.graphql(graphqlOperation(createUserShowInteraction, { input: interactionRequest }));
    const storeStatus = status === "GOING" ? 'going' : 'interested';
    console.log('saving interaction', data, storeStatus)
    commit('createConcertInteraction', {status: storeStatus, payload: data });
  } catch (error) {
    console.log("Create User Interaction Error", error);
  }
}

export async function removeConcertInteraction(context, { data, status }) {
  const user = this.getters['auth/user'];
  console.log('checking interactions', user.id)

  const interactionToDelete = context.state.events[status].find(
    interaction => interaction.userId === user.id && interaction.concertId === data.id
  );

  if (!interactionToDelete) {
    console.error('Interaction not found for deletion');
    return;
  }

  const interactionRequest = {
    id: interactionToDelete.id, // Assuming the id property exists on the interaction object
  };

  try {
    await API.graphql(graphqlOperation(deleteUserShowInteraction, { input: interactionRequest }));
     const storeStatus = status === "GOING" ? 'going' : 'interested';
    context.commit('removeConcertInteraction', {status: storeStatus, payload: data });
  } catch (error) {
    console.log("Create Venue Error", error);
  }
}

