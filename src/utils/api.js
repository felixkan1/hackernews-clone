const TOP_POSTS_URL = 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty'
const NEW_POSTS_URL = 'https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty'
const USER_URL_BASE = 'https://hacker-news.firebaseio.com/v0/user/'
const STORY_URL_BASE = 'https://hacker-news.firebaseio.com/v0/item/'


function getStoryUrl(storyNumber){
  return `${STORY_URL_BASE}${storyNumber}.json`
}


//function returns an array of promises containing 30 stories (top or popular)
export default function getStories(which) {

  let type = which === 'top' ? TOP_POSTS_URL : NEW_POSTS_URL

  return fetch(type)          
  .then(res => res.json()) //convert response body to JS object
  .then(stories => {
    //returns an array of promises
    return stories.slice(0,30).map(getItem)
    
  })
  .catch(error => console.log(error))

}


function getItem(id) {
  return fetch(getStoryUrl(id))
    .then(res => res.json())

}




