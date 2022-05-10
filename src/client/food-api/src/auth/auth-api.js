const url = "https://binitie-bg-food-app.herokuapp.com";

const signIn = async (user, role) => {
  try {
    let response = await fetch(`${url}/${role}/login/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const signOut = async (role, { token }) => {
  try {
    let response = await fetch(`${url}/${role}/logout`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export { signIn, signOut };
