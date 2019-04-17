function applyTheme(theme) {
    if (theme === 'Dark') {
        document.body.classList.add('darkMode')
        document.body.classList.remove('lightMode')
    } else {
        document.body.classList.add('lightMode')
        document.body.classList.remove('darkMode')
    }
}

export default applyTheme;
