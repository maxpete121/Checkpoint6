import { reactive } from 'vue'
import { Post } from './models/Post.js'
import { Profile } from './models/Profile.js'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},

  /**@type {Post[]} */
  posts: [],

  /**@type {Profile} */
  activeProfile: {},

  profilePosts: [],

  currentPage: 1
})
