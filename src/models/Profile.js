



export class Profile {
    constructor (data) {
      this.id = data._id
      this.name = data.name
      this.picture = data.picture
      this.bio = data.bio
      this.graduated = data.graduated
      this.github = data.github
      this.coverImg = data.coverImg
      this.class = data.class
      this.linkedin = data.linkedin
    }
  }