const apiKey = 'a652b5dea21fd205364414ec96220750';
const appId = '55db0493'


const url = new URL('https://api.edamam.com/api/recipes/v2');
url.searchParams.append ('app_id', appId)
url.searchParams.append('app_key', apiKey);
url.searchParams.append('type', 'public');
url.searchParams.append('q', '')
url.searchParams.append('cuisineType', '')
url.searchParams.append('random', String(true))
url.searchParams.set('mealType', 'lunch')
export { url };
