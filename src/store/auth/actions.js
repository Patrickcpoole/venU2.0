import {Auth} from "aws-amplify"

export async function logout({commit}) {
  console.log('logout was fired')
      commit('setUser', null)
       await this.$router.push('/')
      return await Auth.signOut()

    }

    export async function  login({commit}, {username, password}) {
      try {
        console.log('trying sign in')
        await Auth.signIn({
          username,
          password
        })

        const userInfo = await Auth.currentUserInfo();
        console.log('user info', userInfo)
        commit('setUser', userInfo)
        await this.$router.push('/venues')
        return Promise.resolve("Login Success")

      } catch(err) {
        console.log(err)
        return Promise.reject(err)
      }
    }

    export async function confirmSignUp(_, {username, code}) {
      try {
        await Auth.confirmSignUp(username, code)
        return Promise.resolve('SignUp Confirm Success')
      } catch(error) {
        return Promise.reject('SignUp Confirm Failed')
      }
    }

    export async function signUp(_, {username, password, email}) {
      try {
        await Auth.signUp({
          username,
          password,
          attributes: {
            email
          }
        })
        return Promise.resolve('SignUp Success')
      } catch(error) {
        return Promise.reject('SignUp Failed')
      }
    }

    export async function authAction({commit}) {
      const userInfo = await Auth.currentUserInfo()
      commit('setUser', userInfo)
    }
