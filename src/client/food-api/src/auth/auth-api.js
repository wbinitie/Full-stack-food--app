const signIn = async (user, role) => {
  try {
    let response = await fetch(`http://localhost:8080/${role}/login/`, {
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

const signOut = async () => {
  try {
    let response = await fetch("/admin/logout/", {
      method: "POST",
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export { signIn, signOut };
