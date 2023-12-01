import {Auth} from "aws-amplify"

export async function logout({commit}) {

  console.log('logout was fired')

  commit('spotify/setAccessToken', null, {root: true})
  commit('spotify/setRefreshToken', null, {root: true})
  commit('profile/clearProfileState', null, {root: true})
  commit('menu/clearMenuState', null, {root: true})
  commit('underground/clearUndergroundState', null, {root: true})
  commit('setUser', null)
  await this.$router.push('/')
  return await Auth.signOut()

}

export async function login({commit, dispatch}, {username, password}) {
  try {
    console.log('trying sign in')
    await Auth.signIn({
      username,
      password
    })

    dispatch('spotify/spotifyAuth', {}, {root: true})

    const userInfo = await Auth.currentUserInfo();


    commit('setUser', userInfo)

    await this.$router.push('/venues')
    return Promise.resolve("Login Success")

  } catch (err) {
    console.log(err)
    return Promise.reject(err)
  }
}

export async function confirmSignUp(_, {username, code}) {
  try {
    await Auth.confirmSignUp(username, code)
    return Promise.resolve('SignUp Confirm Success')
  } catch (error) {
    return Promise.reject('SignUp Confirm Failed')
  }
}

export async function signUp(_, {username, password, email}) {
  console.log('sign up fired', username, password, email)
  try {
    await Auth.signUp({
      username,
      password,
      attributes: {
        email
      }
    })
    return Promise.resolve('SignUp Success')
  } catch (error) {
    console.error("Sign-up error:", error);
    return Promise.reject(error.message || 'SignUp Failed');
  }
}

export async function authAction({commit}) {
  const userInfo = await Auth.currentUserInfo()
  commit('setUser', userInfo)
}
