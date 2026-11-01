(() => {
  // Depth meter: scroll position -> 0..10,000 m
  const dm = document.getElementById('dm'), dz = document.getElementById('dz');
  const zones = [[200,'Sunlight zone'],[1000,'Twilight zone'],[4000,'Midnight zone'],[6000,'Abyssal zone'],[11000,'Hadal zone']];
  function update() {
    const h = document.documentElement.scrollHeight - innerHeight;
    const d = Math.round((h > 0 ? scrollY / h : 0) * 1000) * 10;
    dm.textContent = d.toLocaleString('en-US');
    dz.textContent = zones.find(z => d <= z[0])[1];
  }
  addEventListener('scroll', update, { passive: true });
  addEventListener('resize', update);
  update();

  // Booking simulation
  const modal = document.getElementById('bookModal');
  if (!modal) return;
  const form = document.getElementById('bookForm'), ok = document.getElementById('bookOk');
  form.date.min = new Date().toISOString().split('T')[0];
  document.querySelectorAll('[data-pkg]').forEach(b =>
    b.addEventListener('click', () => {
      const o = [...form.pkg.options].find(o => o.value.toLowerCase() === b.dataset.pkg.toLowerCase());
      if (o) form.pkg.value = o.value;
    }));
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.checkValidity()) { form.classList.add('was-validated'); return; }
    const opt = form.pkg.selectedOptions[0];
    const total = Number(opt.dataset.price) * Number(form.people.value);
    document.getElementById('okCode').textContent = 'DE-' + Math.random().toString(36).slice(2, 8).toUpperCase();
    document.getElementById('okText').textContent =
      `${opt.textContent} · ${form.people.value} คน · ${form.date.value} · รวม ฿${total.toLocaleString('th-TH')}`;
    form.classList.add('d-none'); ok.classList.remove('d-none');
  });
  modal.addEventListener('hidden.bs.modal', () => {
    form.reset(); form.classList.remove('was-validated', 'd-none'); ok.classList.add('d-none');
  });
})();
