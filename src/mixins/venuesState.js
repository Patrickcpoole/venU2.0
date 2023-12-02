import {mapGetters} from 'vuex'


const venuesState = {

  computed: {
    ...mapGetters({
      venues: 'venues/getVenues',
      alphabeticVenues: 'venues/getAlphabeticVenues',
      capacityVenues: 'venues/getCapacityVenues',
      selectedVenue: 'venues/getSelectedVenue'
    })
  }
}

export default venuesState;
