const BASE_URL = 'https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com';

/**
 * Perform login request
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<object>} response data
 */
export async function signIn(email, password) {
  const response = await fetch(`${BASE_URL}/api/auth/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Invalid email or password');
  }
  return data;
}

/**
 * Fetch referrals with optional query filters (search, sort, id)
 * @param {string} token 
 * @param {object} params { search, sort, id }
 * @returns {Promise<object>} response data
 */
export async function getReferrals(token, params = {}) {
  const { search, sort, id } = params;
  
  const queryParams = new URLSearchParams();
  if (search) {
    queryParams.append('search', search);
  }
  if (sort) {
    queryParams.append('sort', sort);
  }
  if (id !== undefined && id !== null) {
    queryParams.append('id', id);
  }

  const queryString = queryParams.toString();
  const url = queryString 
    ? `${BASE_URL}/api/referrals?${queryString}` 
    : `${BASE_URL}/api/referrals`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || `Request failed with status ${response.status}`);
  }
  return data;
}
