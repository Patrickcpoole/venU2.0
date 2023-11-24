import {mapGetters} from 'vuex'


export const venuesState = {

  computed: {
    ...mapGetters({
      venues: 'venues/getVenues',
      alphabeticVenues: 'venues/getAlphabeticVenues',
      capacityVenues: 'venues/getCapacityVenues',
      selectedVenue: 'venues/getSelectedVenue'
    })
  }
}
