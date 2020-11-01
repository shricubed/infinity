document.addEventListener('DOMContentLoaded', () => {
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll('.navbar-burger'),
    0
  )

  if ($navbarBurgers.length > 0) {
    $navbarBurgers.forEach((el) => {
      el.addEventListener('click', () => {
        const target = el.dataset.target
        const $target = document.getElementById(target)

        el.classList.toggle('is-active')
        $target.classList.toggle('is-active')
      })
    })
  }
})

// socket.io announcements
const socket = io(EULER_URL, {
  transports: ['websocket']
})
const statusEl = document.getElementById('socket-status')
const announceItem = document.getElementById('announcement-item')

socket.on('connect', () => {
  if (statusEl) {
    statusEl.classList.remove('is-warning')
    statusEl.classList.add('is-success')
  }

  if (typeof TEAM_UUID !== 'undefined') {
    // user is logged in, join room
    socket.emit('join', TEAM_UUID)
  }
})

socket.on('disconnect', () => {
  if (statusEl) {
    statusEl.classList.add('is-warning')
    statusEl.classList.remove('is-success')
  }

  console.log(
    'Disconnected from the announcements engine. Attempting to reconnect...'
  )
})

socket.on('announcement', (id) => {
  if (announceItem) {
    announceItem.classList.add('alerted')
    announceItem.innerText = 'New Announcement'
    announceItem.href = '/announcements/' + id
  }
})

socket.on('alert', (content) => {
  Swal.fire('Alert!', content, 'warning')
})
