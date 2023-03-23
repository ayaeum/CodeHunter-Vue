import Vue from 'vue'
const task = {
  state: {
    id:"",
    taskName:"",
    owner:"",
    repopath:"",
    branch:"",
    recursive:"",
    reponame:"",
    language:"",
    platform:"",
  },
  mutations: {
    updatetask(state,parameter){
      state.id=parameter.id
      state.taskName=parameter.taskName
      state.owner=parameter.repoowner
      state.repopath=parameter.path
      state.branch=parameter.branch
      state.recursive=parameter.recursive
      state.reponame=parameter.wareHouse
      state.language=parameter.language
      state.platform=parameter.platform
    },

    updatetask1(state,parameter){
      state.id=parameter.id
      state.taskName=parameter.taskName
      state.owner=parameter.owner
      state.repopath=parameter.repopath
      state.branch=parameter.branch
      state.recursive=parameter.recursive
      state.reponame=parameter.reponame
      state.language=parameter.language
      state.platform=parameter.platform
    },
  },
  actions: {

  }
}
export default task