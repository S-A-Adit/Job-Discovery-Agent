async function test() {
  try {
    const urls = [
      'https://jobs.ashbyhq.com/api/non-auth-gp-jobs/anthropic',
      'https://api.lever.co/v0/postings/deliveroo'
    ];
    for (const url of urls) {
      console.log(`Fetching ${url}...`);
      const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      console.log(`Status: ${res.status} ${res.statusText}`);
      if (res.ok) {
        console.log(`Body snippet: ${(await res.text()).substring(0, 100)}`);
      }
    }
  } catch (e) {
    console.error("Fetch failed:", e);
  }
}
test();
