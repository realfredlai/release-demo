import '@/app/global.css';

export default function index() {
  return (
    <div>
      <div className="wrapper">
        <div className="container">
          <div id="hero" className="rounded">
            <div className="text-container">
              <h2>
                <svg
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
                <span>DEMO</span>
              </h2>
              <a href="http://instagram.com/_u/nike">
                Go to Nike Profile - web & mobile
              </a>
            </div>
            <div className="text-container">
              <a href="https://ig.me/m/nike">Go to Nike DM - mobile only</a>
            </div>
            <div className="text-container">
              <a href="instagram://user?username=nike">
                Go to Nike Profile - mobile only{' '}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
