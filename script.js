// script.js

// Typewriter effect for blinking intro text
const blinkingText = document.getElementById('blinking-text');

const typeText = (element, text, speed = 50) => {
  let i = 0;
  const type = () => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  };
  if (element) {
    element.textContent = '';
    type();
  }
};

window.addEventListener('DOMContentLoaded', () => {
  if (blinkingText) {
    typeText(blinkingText, blinkingText.dataset.text || '...');
  }

  // 🌌 Animated Pixel Background: stars + orbs
  const canvas = document.getElementById('bg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Stars (small, glowing dots)
    const stars = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5 + 0.5,
      dx: (Math.random() - 0.5) * 0.1,
      dy: (Math.random() - 0.5) * 0.1
    }));

    // Glowing orbs (larger soft floaters)
    const glowOrbs = Array.from({ length: 20 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 4 + 2,
      alpha: Math.random() * 0.5 + 0.1
    }));

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      ctx.fillStyle = '#00ffcc';
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
        star.x += star.dx;
        star.y += star.dy;

        if (star.x < 0 || star.x > canvas.width) star.dx *= -1;
        if (star.y < 0 || star.y > canvas.height) star.dy *= -1;
      });

      // Glowing orbs (pink drifting particles)
      glowOrbs.forEach(orb => {
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 102, 204, ${orb.alpha})`;
        ctx.fill();
        orb.y += 0.15;
        if (orb.y > canvas.height) orb.y = -orb.radius;
      });

      requestAnimationFrame(draw);
    }

    draw();
  }

  // 💌 Formspree submission handler
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const formData = new FormData(form);
      fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      }).then(response => {
        if (response.ok) {
          alert('✨ Message sent! Thank you!');
          form.reset();
        } else {
          alert('⚠️ Oops! Something went wrong.');
        }
      });
    });
  }

  // 💬 Disqus embed per blog section
  const disqusShortname = "porfolio-6"; // ✅ Your Disqus shortname

  document.querySelectorAll('.disqus_thread').forEach(section => {
    const parentId = section.id.replace('disqus-thread-', '') || 'default';

    const configScript = document.createElement('script');
    configScript.innerHTML = `
      var disqus_config = function () {
        this.page.url = window.location.href.split('#')[0] + "#${parentId}";
        this.page.identifier = "${parentId}";
      };
    `;

    const embedScript = document.createElement('script');
    embedScript.src = `https://${disqusShortname}.disqus.com/embed.js`;
    embedScript.setAttribute('data-timestamp', +new Date());

    section.appendChild(configScript);
    section.appendChild(embedScript);
  });
});
