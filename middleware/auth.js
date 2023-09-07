export default defineNuxtRouteMiddleware((from, to) => {
  const user = useSupabaseUser();

  if (!user.value && to.fullPath == "/checkout") {
    return navigateTo("/auth");
  }
  if (!user.value && to.fullPath == "/apply") {
    return navigateTo("/auth");
  }
  if (!user.value && to.fullPath == "/documents") {
    return navigateTo("/auth");
  }
});
