export function* changeDarkMode() {
  document.body.classList.add("is-transitioning")
}

export function* darkModeTransitionFinish() {
  document.body.classList.remove("is-transitioning")

  if (document.body.classList.contains("is-dark")) 
    document.body.classList.remove("is-dark")
  else 
    document.body.classList.add("is-dark")
} 
