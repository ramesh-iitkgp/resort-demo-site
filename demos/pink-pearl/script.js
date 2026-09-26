/**
 * PINK PEARL BEACH RESORT — MANDARMANI
 * Interactive Logic, Direct WhatsApp Booking Engine & Gallery
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header Sticky Effect
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Hero Background Crossfade Slider
  const slides = document.querySelectorAll('.hero-slide');
  let currentSlide = 0;
  if (slides.length > 1) {
    setInterval(() => {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
    }, 5000);
  }

  // 3. Room Database for Interactive Modals
  const ROOMS = {
    'deluxe-ac-cottage': {
      name: 'Deluxe AC Beach Cottage',
      rate: 2999,
      originalRate: 3800,
      image: './assets/images/deluxe-ac-bedroom-suite.jpg',
      size: '340 sq.ft',
      bed: '1 King Bed',
      guests: '2 Adults + 1 Child',
      view: 'Lawn & Direct Beach Access',
      desc: 'Our signature air-conditioned private cottage featuring designer false ceiling with ambient mood lighting, plush king-size bed, vanity dressing mirror, wardrobe, and attached modern bath. Steps from both the swimming pool and Mandarmani beach.',
      amenities: [
        'Direct Walkout to Beach & Pool',
        'High-Efficiency Split AC',
        'Designer False Ceiling with Mood Lighting',
        'Plush King Bed with Luxury Linens',
        'Complimentary Hot Beachside Breakfast',
        'Attached Bath with 24/7 Hot Water',
        'LED TV with Satellite Channels',
        'Dedicated Cottage Room Service'
      ]
    },
    'poolside-cottage': {
      name: 'Super Deluxe Poolside Cottage',
      rate: 3499,
      originalRate: 4400,
      image: './assets/images/cottages-night-promenade.jpg',
      size: '380 sq.ft',
      bed: '1 King Bed + Sit-out',
      guests: '2 Adults + 1 Child',
      view: 'Pool View & Night Illumination',
      desc: 'Situated right along our illuminated promenade with immediate frontage to the signature swimming pool. Features an extended private sit-out porch to enjoy the evening neon pool glow and sea breeze.',
      amenities: [
        'Front-Row Swimming Pool Access',
        'Private Sit-out Veranda',
        'Whisper-Quiet Split AC',
        'Tea & Coffee Maker Station',
        'Complimentary Breakfast & Welcome Drink',
        '24/7 Room Dining Service',
        'High-Speed Wi-Fi',
        'Evening Turndown Service'
      ]
    },
    'family-ocean-suite': {
      name: 'Ocean View Family Suite',
      rate: 4999,
      originalRate: 6200,
      image: './assets/images/family-ocean-suite.jpg',
      size: '520 sq.ft',
      bed: '2 Queen Beds',
      guests: '4 Adults',
      view: 'Panoramic Bay of Bengal & Beach',
      desc: 'Expansive family sanctuary designed for groups and families seeking maximum comfort. Generous living area, panoramic coastal window views, and quick access to the elevated wooden ocean deck.',
      amenities: [
        'Spacious Double Bedroom Layout',
        'Dual High-Capacity Split ACs',
        'Panoramic Ocean & Beach Views',
        'Comfortable Lounge Seating Area',
        'Complimentary Breakfast for 4 Guests',
        'Mini Refrigerator & Beverage Corner',
        'Priority Seating on Wooden Beach Deck',
        'Dedicated Family Concierge Service'
      ]
    },
    'executive-villa': {
      name: 'Executive Beachfront Villa',
      rate: 5999,
      originalRate: 7500,
      image: './assets/images/poolside-mosaic-glow.jpg',
      size: '620 sq.ft',
      bed: '1 Grand King + Daybed',
      guests: '3 Adults',
      view: 'Direct Beachfront & Poolside',
      desc: 'The pinnacle of luxury at Pink Pearl Beach Resort. A standalone private sanctuary with premium stone finishes, direct private deck access, VIP welcome amenities, and unobstructed sunset views.',
      amenities: [
        'VIP Welcome Fruit Basket & Refreshments',
        'Private Sun Deck Access with Loungers',
        'Designer En-Suite Bath with Rain Shower',
        'Direct 1-Tap Concierge via WhatsApp',
        'Inclusive Chef-Curated Breakfast',
        'Complimentary Sunset Mocktails for 2',
        'Early Check-In / Late Check-Out (Subject to Avail)',
        'Private Car Parking Right at Villa'
      ]
    }
  };

  // 4. Booking Engine Modal Elements & Calculation
  const bookingModal = document.getElementById('bookingModal');
  const btnOpenBookingList = document.querySelectorAll('.open-booking-modal');
  const btnCloseBooking = document.getElementById('closeBookingModal');
  
  const bookRoomSelect = document.getElementById('modalRoomSelect');
  const bookCheckIn = document.getElementById('modalCheckIn');
  const bookCheckOut = document.getElementById('modalCheckOut');
  const bookGuests = document.getElementById('modalGuests');
  const bookRoomsCount = document.getElementById('modalRoomsCount');
  
  const calcRoomName = document.getElementById('calcRoomName');
  const calcNights = document.getElementById('calcNights');
  const calcTotalAmount = document.getElementById('calcTotalAmount');
  const btnWhatsAppConfirm = document.getElementById('btnWhatsAppConfirm');

  // Set default dates: Today + 1 day to Today + 3 days
  const today = new Date();
  const dIn = new Date(today);
  dIn.setDate(today.getDate() + 1);
  const dOut = new Date(today);
  dOut.setDate(today.getDate() + 3);

  const formatDateYMD = (d) => d.toISOString().split('T')[0];

  if (bookCheckIn && bookCheckOut) {
    bookCheckIn.value = formatDateYMD(dIn);
    bookCheckOut.value = formatDateYMD(dOut);
    bookCheckIn.min = formatDateYMD(today);
    bookCheckOut.min = formatDateYMD(dIn);
  }

  // Quick Strip synchronization
  const stripCheckIn = document.getElementById('stripCheckIn');
  const stripCheckOut = document.getElementById('stripCheckOut');
  const stripRoom = document.getElementById('stripRoom');
  const stripGuests = document.getElementById('stripGuests');
  const stripForm = document.getElementById('stripBookingForm');

  if (stripCheckIn && stripCheckOut) {
    stripCheckIn.value = formatDateYMD(dIn);
    stripCheckOut.value = formatDateYMD(dOut);
    stripCheckIn.min = formatDateYMD(today);
  }

  if (stripForm) {
    stripForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (stripCheckIn) bookCheckIn.value = stripCheckIn.value;
      if (stripCheckOut) bookCheckOut.value = stripCheckOut.value;
      if (stripRoom) bookRoomSelect.value = stripRoom.value;
      if (stripGuests) bookGuests.value = stripGuests.value;
      openBookingModal();
    });
  }

  function openBookingModal(roomKey) {
    if (roomKey && ROOMS[roomKey]) {
      bookRoomSelect.value = roomKey;
    }
    updateBookingCalculation();
    bookingModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeBookingModal() {
    bookingModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  btnOpenBookingList.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const rKey = btn.getAttribute('data-room') || '';
      openBookingModal(rKey);
    });
  });

  if (btnCloseBooking) {
    btnCloseBooking.addEventListener('click', closeBookingModal);
  }

  // Click outside to close
  if (bookingModal) {
    bookingModal.addEventListener('click', (e) => {
      if (e.target === bookingModal) closeBookingModal();
    });
  }

  // Calculate Nights and Price
  function updateBookingCalculation() {
    const selectedKey = bookRoomSelect.value || 'deluxe-ac-cottage';
    const roomInfo = ROOMS[selectedKey] || ROOMS['deluxe-ac-cottage'];
    
    const cin = new Date(bookCheckIn.value);
    const cout = new Date(bookCheckOut.value);
    
    let nights = 1;
    if (cout > cin) {
      const diffTime = Math.abs(cout - cin);
      nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
    }

    const roomsCount = parseInt(bookRoomsCount.value) || 1;
    const guestsCount = bookGuests.value || '2 Guests';
    const total = roomInfo.rate * nights * roomsCount;

    if (calcRoomName) calcRoomName.textContent = `${roomInfo.name} (${roomsCount} Room${roomsCount > 1 ? 's' : ''})`;
    if (calcNights) calcNights.textContent = `${nights} Night${nights > 1 ? 's' : ''} • ₹${roomInfo.rate.toLocaleString('en-IN')}/night`;
    if (calcTotalAmount) calcTotalAmount.textContent = `₹${total.toLocaleString('en-IN')}`;

    // Generate WhatsApp Link
    const phoneNum = '919830000000'; // Default hotel inquiry line (configurable)
    const msg = `*New Direct Booking Inquiry — Pink Pearl Beach Resort, Mandarmani* 🌊
--------------------------------
• *Room Category:* ${roomInfo.name}
• *Rooms:* ${roomsCount}
• *Dates:* ${bookCheckIn.value} to ${bookCheckOut.value} (${nights} Night${nights > 1 ? 's' : ''})
• *Guests:* ${guestsCount}
• *Estimated Direct Rate:* ₹${total.toLocaleString('en-IN')} (Special Direct 15% OFF Applied)
--------------------------------
Hello! I would like to check availability and confirm this reservation directly.`;

    if (btnWhatsAppConfirm) {
      btnWhatsAppConfirm.href = `https://wa.me/${phoneNum}?text=${encodeURIComponent(msg)}`;
    }
  }

  [bookRoomSelect, bookCheckIn, bookCheckOut, bookGuests, bookRoomsCount].forEach(input => {
    if (input) input.addEventListener('change', updateBookingCalculation);
  });

  // 5. Room Details Modal
  const roomDetailModal = document.getElementById('roomDetailModal');
  const btnCloseRoomDetail = document.getElementById('closeRoomDetailModal');
  const btnDetailList = document.querySelectorAll('.open-room-detail');

  btnDetailList.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const rKey = btn.getAttribute('data-room');
      const room = ROOMS[rKey];
      if (!room) return;

      document.getElementById('modalDetailImg').src = room.image;
      document.getElementById('modalDetailTitle').textContent = room.name;
      document.getElementById('modalDetailDesc').textContent = room.desc;
      document.getElementById('modalDetailSize').textContent = room.size;
      document.getElementById('modalDetailBed').textContent = room.bed;
      document.getElementById('modalDetailGuests').textContent = room.guests;
      document.getElementById('modalDetailView').textContent = room.view;
      document.getElementById('modalDetailPrice').textContent = `₹${room.rate.toLocaleString('en-IN')}`;
      document.getElementById('modalDetailOriginalPrice').textContent = `₹${room.originalRate.toLocaleString('en-IN')}`;

      // Amenities list
      const amenContainer = document.getElementById('modalDetailAmenities');
      amenContainer.innerHTML = '';
      room.amenities.forEach(a => {
        const li = document.createElement('li');
        li.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ec4899" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> <span>${a}</span>`;
        amenContainer.appendChild(li);
      });

      // Connect Book Now button inside detail modal
      const btnBookFromDetail = document.getElementById('btnBookFromDetail');
      btnBookFromDetail.onclick = () => {
        roomDetailModal.classList.remove('active');
        openBookingModal(rKey);
      };

      roomDetailModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  if (btnCloseRoomDetail) {
    btnCloseRoomDetail.addEventListener('click', () => {
      roomDetailModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  if (roomDetailModal) {
    roomDetailModal.addEventListener('click', (e) => {
      if (e.target === roomDetailModal) {
        roomDetailModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // 6. Gallery Filter Tabs
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      galleryItems.forEach(item => {
        const cat = item.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // 7. Lightbox for Photo Gallery
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const btnCloseLightbox = document.getElementById('closeLightbox');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.querySelector('h4') ? item.querySelector('h4').textContent : '';
      if (img && lightboxModal) {
        lightboxImg.src = img.src;
        lightboxCaption.textContent = title;
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (btnCloseLightbox) {
    btnCloseLightbox.addEventListener('click', () => {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // 8. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const qBtn = item.querySelector('.faq-question');
    qBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // 9. Escape key closes any active modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (bookingModal && bookingModal.classList.contains('active')) closeBookingModal();
      if (roomDetailModal && roomDetailModal.classList.contains('active')) {
        roomDetailModal.classList.remove('active');
        document.body.style.overflow = '';
      }
      if (lightboxModal && lightboxModal.classList.contains('active')) {
        lightboxModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  });

  // 10. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
    });
  }
});
