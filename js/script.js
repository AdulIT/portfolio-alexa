// Menu Burger
const hamburger = document.querySelector('.hamburger'),
      closeBtn = document.querySelector('.close'),
      menu =  document.querySelector('.menu')


hamburger.addEventListener('click', () =>
{
    menu.style.display = 'block'
    closeBtn.style.display = 'block'
})

closeBtn.addEventListener('click', () =>
{
    menu.style.display = 'none'
    closeBtn.style.display = 'none'
})

// Tabs
const tabsParent = document.querySelector('.tabs-container'),
      tabs = tabsParent.querySelectorAll('.tabs-item'),
      tabsContent = document.querySelectorAll('.portfolio__projects')

function hideTabContent()
{
    tabsContent.forEach(item =>
        {
            item.classList.add('hide')
            item.classList.remove('show')
        })

    tabs.forEach(item =>
        {
            item.classList.remove('tabs-item__active')
        })
}

function showTabContent(i = 0)
{
    tabsContent[i].classList.add('show')
    tabsContent[i].classList.remove('hide')
    tabs[i].classList.add('tabs-item__active')
}

hideTabContent()
showTabContent()

tabsParent.addEventListener('click', (e) =>
{
    const target = e.target

    if (target && target.classList.contains('tabs-item'))
    {
        tabs.forEach((item, i) =>
            {
                if (target == item)
                {
                    hideTabContent()
                    showTabContent(i)
                }
            })
    }
})

// Custom Video Player
const container = document.querySelector('.video-container'),
      mainVideo = container.querySelector('.video-project'),
      videoTimeline = container.querySelector('.video-timeline'),
      progressBar = container.querySelector('.progress-bar'),
      volumeBtn = container.querySelector('.volume i'),
      volumeSlider = container.querySelector('.left input'),
      currentVidTime = container.querySelector('.current-time'),
      videoDuration = container.querySelector('.video-duration'),
      skipBackward = container.querySelector('.skip-backward i'),
      skipForward = container.querySelector('.skip-forward i'),
      playPauseBtn = container.querySelector('.play-pause i'),
      speedBtn = container.querySelector('.playback-speed span'),
      speedOptions = container.querySelector('.speed-options'),
      picInPicBtn = container.querySelector('.pic-in-pic span'),
      fullscreenBtn = container.querySelector('.fullscreen i'),
      videoPlayBtn = container.querySelector('.video-play')

let timer

const hideControls = () =>
{
    // if (mainVideo.paused) return
    timer = setTimeout(() =>
    {
        container.classList.remove('show-controls')
    }, 3000)
}

hideControls()

container.addEventListener('mousemove', () =>
{
    container.classList.add('show-controls')
    clearTimeout(timer)
    hideControls()
})

const formatTime = time =>
{
    let seconds = Math.floor(time % 60),
        minutes = Math.floor(time / 60) % 60,
        hours   = Math.floor(time / 3600)

    seconds = seconds < 10 ? `0${seconds}` : seconds
    minutes = minutes < 10 ? `0${minutes}` : minutes
    hours   = hours < 10 ? `0${hours}` : hours

    if (hours == 0)
    {
        return `${minutes}:${seconds}`
    }
    return `${hours}:${minutes}:${seconds}`
}

videoPlayBtn.addEventListener('click', () =>
{
    mainVideo.play()
    videoPlayBtn.style.display = 'none'
})

mainVideo.addEventListener('timeupdate', (e) =>
{
    let { currentTime, duration } = e.target // get the currentTime & duration of the video
    let percent = (currentTime / duration) * 100 // get the percent
    progressBar.style.width = `${percent}%`
    currentVidTime.innerText = formatTime(currentTime)
})

mainVideo.addEventListener('loadeddata', (e) =>
{
    videoDuration.innerText = formatTime(e.target.duration)
})

videoTimeline.addEventListener('click', (e) =>
{
    let timelineWidth = videoTimeline.clientWidth
    mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration
})

const draggableProgressBar = (e) =>
{
    let timelineWidth = videoTimeline.clientWidth
    progressBar.style.width = `${e.offsetX}px`
    mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration
    currentVidTime.innerText = formatTime(mainVideo.currentTime)
}

videoTimeline.addEventListener('mousedown', () =>
{
    videoTimeline.addEventListener('mousemove', draggableProgressBar)
})

container.addEventListener('mouseup', () =>
{
    videoTimeline.removeEventListener('mousemove', draggableProgressBar)
})

videoTimeline.addEventListener('mousemove', (e) =>
{
    const progressTime = videoTimeline.querySelector('span')
    let offsetX = e.offsetX // getting mouseX position
    progressTime.style.left = `${offsetX}px` // passing offsetX value as progressTime left value
    let timelineWidth = videoTimeline.clientWidth // getting videoTimeline width
    let percent = (e.offsetX / timelineWidth) * mainVideo.duration // getting percent
    progressTime.innerText = formatTime(percent)
})

volumeBtn.addEventListener('click', () =>
{
    if (!volumeBtn.classList.contains('fa-volume-high')) // if volume icon isn't volume high icon
    {
        mainVideo.volume = 0.5
        volumeBtn.classList.replace('fa-volume-xmark', 'fa-volume-high')
    }
    else
    {
        mainVideo.volume = 0.0
        volumeBtn.classList.replace('fa-volume-high', 'fa-volume-xmark')
    }
    volumeSlider.value = mainVideo.volume
})

volumeSlider.addEventListener('input', (e) =>
{
    mainVideo.volume = e.target.value // passing slider value as video volume
    if (e.target.value == 0)
    {
        volumeBtn.classList.replace('fa-volume-high', 'fa-volume-xmark')
    }
    else
    {
        volumeBtn.classList.replace('fa-volume-xmark', 'fa-volume-high')
    }
})

speedBtn.addEventListener('click', () =>
{
    speedOptions.classList.toggle('show')
})

speedOptions.querySelectorAll('li').forEach(option =>
    {
        option.addEventListener('click', () =>
        {
            mainVideo.playbackRate = option.dataset.speed
            speedOptions.querySelector('.active').classList.remove('active')
            option.classList.add('active')
        })
    })

document.addEventListener('click', e =>
{
    if (e.target.tagName !== 'SPAN' || e.target.className !== 'material-symbols-rounded')
    {
        speedOptions.classList.remove('show')
    }
})

picInPicBtn.addEventListener('click', () =>
{
    mainVideo.requestPictureInPicture()
})

fullscreenBtn.addEventListener('click', () =>
{
    container.classList.toggle('fullscreen')
    if (document.fullscreenElement)
    {
        fullscreenBtn.classList.replace('fa-compress', 'fa-expand')
        return document.exitFullscreen
    }
    fullscreenBtn.classList.replace('fa-expand', 'fa-compress')
    container.requestFullscreen
})

skipBackward.addEventListener('click', () =>
{
    mainVideo.currentTime -= 5
})

skipForward.addEventListener('click', () =>
{
    mainVideo.currentTime += 5
})

playPauseBtn.addEventListener('click', () =>
{
    if (mainVideo.paused)
    {
        mainVideo.play()
        videoPlayBtn.style.display = 'none'
    } else
    {
        mainVideo.pause()
        videoPlayBtn.style.display = 'block'
    }
    // mainVideo.paused ? mainVideo.play() : mainVideo.pause()
})

mainVideo.addEventListener('play', () =>
{
    playPauseBtn.classList.replace('fa-play', 'fa-pause')
})

mainVideo.addEventListener('pause', () =>
{
    playPauseBtn.classList.replace('fa-pause', 'fa-play')
})