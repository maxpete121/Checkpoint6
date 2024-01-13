



export class Profile {
    constructor (data) {
      this.id = data._id
      this.name = data.name
      this.picture = data.picture
      this.bio = data.bio
      this.graduated = data.graduated
      this.github = data.github || 'No Github link saved...'
      this.coverImg = data.coverImg
      this.class = data.class || 'No Class saved...'
      this.linkedin = data.linkedin || 'No Linkedin link saved...'
    }
  }