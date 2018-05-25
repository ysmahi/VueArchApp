import axios from 'axios/index'
import * as qs from 'qs'

const apiUrl = 'https://api.github.com/'
const reposUrl = 'repos/'
const gatekeeperUrl = 'http://localhost:9999/authenticate/'

export let getToken = () => {
  return new Promise((resolve, reject) => {
    let code = qs.parse(window.location.search.slice(1)).code

    axios.get(gatekeeperUrl + code)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data.token)
          reject('Error in getToken')
        }
      })
  })
}

export let getBranchSha = (username, repoName, branchName, token = '') => {
  return new Promise(
    (resolve, reject) => {
      if (token.localeCompare('') === 0) {
        axios.get(apiUrl + reposUrl + username + '/' + repoName + '/branches/' + branchName)
          .then((response) => {
            if (response.status === 200) {
              let branchSha = response.data.commit.sha
              resolve(branchSha)
              reject('Error in getBranchSha')
            }
          })
      }

      else {
        axios.get(apiUrl + reposUrl + username + '/' + repoName + '/branches/' + branchName,
          {headers: {Authorization: 'Bearer ' + token}})
          .then((response) => {
            if (response.status === 200) {
              let branchSha = response.data.commit.sha
              resolve(branchSha)
              reject('Error in getBranchSha')
            }
          })
      }
    }
  )
}

export let getBlobSha = (username, repoName, blobPath) => {
  return new Promise(
    (resolve, reject) => {
      axios.get(apiUrl + reposUrl + username + '/' + repoName + '/contents/' + blobPath)
        .then((response) => {
          if (response.status === 200) {
            let branchSha = response.data.sha
            resolve(branchSha)
            reject('Error in getBranchSha')
          }
        })
    }
  )
}

export let getNodeTreeRecursive = (username, repoName, BranchSha, token = '') => {
  return new Promise(
    (resolve, reject) => {
      if (token.localeCompare('') === 0) {
        axios.get(apiUrl + reposUrl + username + '/' + repoName + '/git/trees/' + BranchSha + '?recursive=1')
          .then((response) => {
            if (response.status === 200) {
              resolve(response.data.tree)
              reject('Error in getNodeTreeRecursive')
            }
          })
      } else {
        axios.get(apiUrl + reposUrl + username + '/' + repoName + '/git/trees/' + BranchSha + '?recursive=1',
          {headers: {Authorization: 'Bearer ' + token}})
          .then((response) => {
            if (response.status === 200) {
              resolve(response.data.tree)
              reject('Error in getNodeTreeRecursive')
            }
          })
      }
    }
  )
}

export let getElementContent = (username, repoName, pathElement, token = '') => {
  return new Promise(
    (resolve, reject) => {
      if (token.localeCompare('') === 0) {
        axios.get(apiUrl + reposUrl + username + '/' + repoName + '/contents/' + pathElement)
          .then((response) => {
            if (response.status === 200) {
              resolve(response.data.content)
              reject('Error in getElementContent')
            }
          })
      } else {
        axios.get(apiUrl + reposUrl + username + '/' + repoName + '/contents/' + pathElement,
          {headers: {Authorization: 'Bearer ' + token}})
          .then((response) => {
            if (response.status === 200) {
              resolve(response.data.content)
              reject('Error in getElementContent')
            }
          })
      }
    }
  )
}

export let updateElementInfo = (owner, repo, branchOrElementPath, content, sha,
                                token, commitMessage, nameCommitter, emailCommitter) => {
  return new Promise((resolve, reject) => {
    let encodedContent = btoa(content)

    let jsonData = {
      'message': commitMessage,
      'committer': {
        'name': nameCommitter,
        'email': emailCommitter
      },
      'content': encodedContent,
      'sha': sha
    }

    axios.put('https://api.github.com/repos/' + owner + '/' + repo + '/contents/' + branchOrElementPath,
      jsonData,
      // Put personal github token after Bearer
      {headers: {'Authorization': 'Bearer ', 'Content-Type': 'application/json'}})
      .then((response) => {
        if (response.status === 200) {
          // TODO Toast success
          resolve('Element updated on github')
          reject('Error in pushElementInfo')
        }
      })
  })
}
