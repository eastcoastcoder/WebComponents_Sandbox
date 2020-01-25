import {
  component,
  html,
  useState,
  useEffect
} from "https://unpkg.com/haunted/haunted.js";
import "https://cdnjs.cloudflare.com/ajax/libs/circles/0.0.6/circles.js";

function Bio() {
  // TODO: refactor to useReducer
  const [aboutContent, setAboutContent] = useState(
    localStorage.getItem("about") || ""
  );
  const [skillsContent, setSkillsContent] = useState(
    localStorage.getItem("skills")
      ? JSON.parse(localStorage.getItem("skills"))
      : {}
  );
  // const [loaded, setLoaded] = useState(false);

  const doGistFetch = async () => {
    const response = await fetch(
      "https://gist.githubusercontent.com/ethanx94/b130e3098fb28604339a026964e4e6c0/raw/b3cba6a15fe638f7e62c9e967f1615cbbe3e3b5f/personal-site.json"
    );
    if (response.status === 200) {
      const result = await response.json();
      setCache(result);
      setAboutContent(result.about);
      setSkillsContent(result.skills);
    }
  };

  // TODO: incorporate into reducer
  const setCache = resultObj => {
    Object.keys(resultObj).forEach(key => {
      localStorage.setItem(key, JSON.stringify(resultObj[key]));
    });
  };

  useEffect(() => {
    if (!aboutContent || !Object.keys(skillsContent).length) {
      doGistFetch();
    }
    window.Circles.create({
      id: "circles-1",
      radius: 60,
      value: 43,
      maxValue: 100,
      width: 10,
      text: function(value) {
        return value + "%";
      },
      colors: ["#D3B6C6", "#4B253A"],
      duration: 400,
      wrpClass: "circles-wrp",
      textClass: "circles-text",
      valueStrokeClass: "circles-valueStroke",
      maxValueStrokeClass: "circles-maxValueStroke",
      styleWrapper: true,
      styleText: true
    });
    // setLoaded(true);
    return () => {
      document.getElementById('circles-1').childNodes.forEach(child => child.remove());
      console.log('leaving');
    }
  }, []);

  return html`
    <link rel="stylesheet" href="./src/style.css">
    <div class="about text-center" id="about">
        <div class="container">
            <h3>ABOUT ME</h3>
            <div class="strip text-center"><img src="./src/images/about.png" alt=" " /></div>
            <p>
              ${aboutContent}
            </p>
            <ul>
                <li>
                    <a class="drib" href="https://github.com/ethanx94"></a>
                </li>
                <li>
                    <a class="twit" href="http://twitter.com/eastcoastcoder"></a>
                </li>
                <li>
                    <a class="in" href="https://www.linkedin.com/in/ethan-richardson-854214b5"></a>
                </li>
            </ul>
        </div>
    </div>
    <div>
      <h2>My Skills</h2>
      ${Object.keys(skillsContent).map(
        skill =>
          html`
            <div>${skill}: ${skillsContent[skill]}</div>
          `
      )}
    </div>
    <style>
      .about {
        padding:60px 0 25px 0;
      }
      .about h3 {
        margin:0;
        color:#2b2b2b;
        font-size:36px;
        font-weight:500;
        letter-spacing: 18px;
      }
      .strip {
        margin: 28px 0 0px 0;
      }
      .about p {
        margin:45px 0 0 0;
        color:#888b90;
        font-size:18px;
        font-family: 'Lato', sans-serif;
        line-height:1.8em;
      }
      .about ul {
        padding:0;
        margin:45px 0 0 0;
      }
      .about ul li {
        list-style-type:none;
        display:inline-block;
        margin-right:25px;
      }
      .about ul li a.fb {
        background: url(./src/images/icons.png) no-repeat 0px 0px;
        width:72px;
        height:72px;
        display:block;
      }
      .about ul li a.twit {
        background: url(./src/images/icons.png) no-repeat -99px 0px;
        width:72px;
        height:72px;
        display:block;
      }
      .about ul li a.twit:hover {
        background: url(./src/images/icons.png) no-repeat -99px -71px;
      }
      .about ul li a.in {
        background: url(./src/images/icons.png) no-repeat -199px 0px;
        width:72px;
        height:72px;
        display:block;
      }
      .about ul li a.in:hover {
        background: url(./src/images/icons.png) no-repeat -199px -71px;
      }
      .about ul li a.drib {
        background: url(./src/images/icons.png) no-repeat -299px 0px;
        width:72px;
        height:72px;
        display:block;
      }
      .about ul li a.drib:hover {
        background: url(./src/images/icons.png) no-repeat -299px -71px;
      }
      .about ul li a.goog {
        background: url(./src/images/icons.png) no-repeat -399px 0px;
        width:72px;
        height:72px;
        display:block;
      }
      .about ul li a.goog:hover {
        background: url(./src/images/icons.png) no-repeat -399px -71px;
      }
      .about ul li a.pin {
        background: url(./src/images/icons.png) no-repeat -499px 0px;
        width:72px;
        height:72px;
        display:block;
      }
      .about ul li a.pin:hover {
        background: url(./src/images/icons.png) no-repeat -499px -71px;
      }
      .about ul li a.fb:hover {
        background: url(./src/images/icons.png) no-repeat 0px -71px;
      }
    </style>
  `;
}

customElements.define("my-bio", component(Bio));
