import { useEffect, useState } from 'react';
import {
	ArrowDown,
	ArrowRight,
	ArrowUpRight,
	Code2,
	Github,
	Menu,
	Moon,
	Sun,
	X,
} from 'lucide-react';

const navigation = [
	['About', 'about'],
	['Skills', 'skills'],
	['Projects', 'projects'],
	['Competitive Programming', 'competitive'],
	['Education', 'education'],
	['Contact', 'contact'],
];

const profiles = [
	{ name: 'GitHub', handle: 'barnomoy', href: 'https://github.com/barnomoy', icon: Github },
	{ name: 'Codeforces', handle: 'barnomoy', href: 'https://codeforces.com/profile/barnomoy', icon: Code2 },
	{ name: 'LeetCode', handle: 'cPycTqjhV4', href: 'https://leetcode.com/u/cPycTqjhV4/', icon: Code2 },
	{ name: 'CodeChef', handle: 'barnomoy', href: 'https://www.codechef.com/users/barnomoy', icon: Code2 },
];

const skillGroups = [
	{ title: 'Programming', skills: ['C', 'C++'] },
	{ title: 'Web development', skills: ['HTML', 'CSS', 'JavaScript', 'React'] },
	{ title: 'Core computer science', skills: ['Data structures', 'Algorithms', 'Problem solving'] },
	{ title: 'Tools', skills: ['Git', 'GitHub', 'VS Code'] },
];

const learningGoals = [
	'Data Structures & Algorithms',
	'Competitive Programming',
	'Full-Stack Web Development',
	'Software Engineering Fundamentals',
];

function SectionLabel({ children, number }) {
	return (
		<p className="eyebrow">
			{children} <span className="section-number">{number}</span>
		</p>
	);
}

function ProfileLink({ profile, index }) {
	const Icon = profile.icon;
	const content = (
		<>
			<span className="profile-index">0{index + 1}</span>
			<span className="profile-icon"><Icon size={18} aria-hidden="true" /></span>
			<span className="profile-text"><strong>{profile.name}</strong><small>{profile.handle}</small></span>
			{profile.href && <ArrowUpRight size={17} className="profile-arrow" aria-hidden="true" />}
		</>
	);

	if (!profile.href) {
		return <div className="profile-row profile-row-placeholder" aria-label={`${profile.name}: ${profile.handle}`}>{content}</div>;
	}

	return (
		<a className="profile-row" href={profile.href} target="_blank" rel="noreferrer">
			{content}
		</a>
	);
}

function getSavedTheme() {
	try {
		return window.localStorage.getItem('portfolio-theme') || 'dark';
	} catch {
		return 'dark';
	}
}

function App() {
	const [theme, setTheme] = useState(getSavedTheme);
	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		document.documentElement.dataset.theme = theme;
		try {
			window.localStorage.setItem('portfolio-theme', theme);
		} catch {}
	}, [theme]);

	useEffect(() => {
		function closeOnEscape(event) {
			if (event.key === 'Escape') setMenuOpen(false);
		}

		document.addEventListener('keydown', closeOnEscape);
		return () => document.removeEventListener('keydown', closeOnEscape);
	}, []);

	function closeMenu() {
		setMenuOpen(false);
	}

	return (
		<>
			<a className="skip-link" href="#main">Skip to content</a>
			<header className="site-header">
				<div className="header-inner">
					<a className="wordmark" href="#home" aria-label="Barnomoy Biswas, home">
						<span className="wordmark-mark">B<span>.</span></span>
						<span className="wordmark-name">Barnomoy Biswas</span>
					</a>

					<nav className={`primary-nav${menuOpen ? ' is-open' : ''}`} id="site-navigation" aria-label="Main navigation">
						<a href="#home" onClick={closeMenu}>Home</a>
						{navigation.map(([label, id]) => (
							<a key={id} href={`#${id}`} onClick={closeMenu}>{label}</a>
						))}
					</nav>

					<div className="header-actions">
						<button
							className="icon-button theme-toggle"
							type="button"
							aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
							title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
							onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
						>
							{theme === 'dark' ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
						</button>
						<button
							className="icon-button menu-toggle"
							type="button"
							aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
							aria-expanded={menuOpen}
							aria-controls="site-navigation"
							onClick={() => setMenuOpen(!menuOpen)}
						>
							{menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
						</button>
					</div>
				</div>
			</header>

			<main id="main">
				<section className="hero section-shell" id="home" aria-labelledby="hero-title">
					<div className="hero-copy">
						<p className="eyebrow"><span className="status-dot" /> CSE student <span className="eyebrow-divider">·</span> Bangladesh</p>
						<h1 id="hero-title">Hi, I’m<br /><span>Barnomoy</span> Biswas<span className="period">.</span></h1>
						<p className="hero-role">CSE Student <span>|</span> Aspiring Software Engineer <span>|</span> Problem Solver</p>
						<p className="hero-description">I’m building strong computer science fundamentals, sharpening my problem-solving skills, and developing practical software projects. I believe in learning by building, solving problems, and improving consistently.</p>
						<div className="hero-actions">
							<a className="button button-primary" href="#projects">Explore my projects <ArrowRight size={17} aria-hidden="true" /></a>
							<a className="button button-quiet" href="#contact">Contact me <ArrowUpRight size={16} aria-hidden="true" /></a>
						</div>
						<div className="hero-socials" aria-label="Social profiles">
							{profiles.filter((profile) => profile.href).map((profile) => {
								const Icon = profile.icon;
								return (
									<a key={profile.name} href={profile.href} target="_blank" rel="noreferrer" aria-label={`${profile.name} profile: ${profile.handle}`}>
										<Icon size={15} aria-hidden="true" /> {profile.name} <ArrowUpRight size={12} aria-hidden="true" />
									</a>
								);
							})}
						</div>
					</div>

					<div className="hero-art" aria-label="A code editor illustration representing an ongoing learning journey">
						<div className="orbit orbit-one" />
						<div className="orbit orbit-two" />
						<div className="code-window">
							<div className="window-bar">
								<div className="window-dots"><i /><i /><i /></div>
								<span>learning.cpp</span>
								<Code2 size={15} aria-hidden="true" />
							</div>
							<pre aria-label="Illustrative C++ code"><code><span className="code-muted">01</span> <span className="code-purple">#include</span> <span className="code-green">&lt;iostream&gt;</span>{'\n'}<span className="code-muted">02</span>{'\n'}<span className="code-muted">03</span> <span className="code-purple">int</span> main() {'{'}{'\n'}<span className="code-muted">04</span>   <span className="code-purple">auto</span> goal = <span className="code-green">"keep learning"</span>;{'\n'}<span className="code-muted">05</span>   <span className="code-purple">while</span> (curious) {'{'}{'\n'}<span className="code-muted">06</span>     build(); solve();{'\n'}<span className="code-muted">07</span>     improve();{'\n'}<span className="code-muted">08</span>   {'}'}{'\n'}<span className="code-muted">09</span>   <span className="code-purple">return</span> 0;{'\n'}<span className="code-muted">10</span> {'}'}</code></pre>
							<div className="window-footer"><span><i /> Learning in progress</span><span>C++</span></div>
						</div>
						<div className="art-caption"><span>01 — THE PROCESS</span><span>Curiosity → consistency</span></div>
						<div className="hero-index">BB<span> / 26</span></div>
					</div>
					<a className="scroll-cue" href="#about"><ArrowDown size={15} aria-hidden="true" /> Scroll to explore</a>
				</section>

				<section className="section-shell section-block about-section" id="about" aria-labelledby="about-title">
					<div className="section-heading">
						<SectionLabel number="01">A little about me</SectionLabel>
						<h2 id="about-title">Learning with<br />a <span>builder’s mindset.</span></h2>
					</div>
					<div className="about-copy">
						<p>I’m a Computer Science and Engineering student who enjoys understanding how software works, one concept at a time. Programming gives me a way to turn curiosity into something useful.</p>
						<p>I’m especially interested in data structures and algorithms, competitive programming, and web development. I value logical thinking, steady practice, and learning from the things I build along the way.</p>
						<p>My focus is on growing solid fundamentals and becoming a thoughtful software engineer over time, not rushing past the learning.</p>
						<a className="text-link" href="#education">More about my journey <ArrowRight size={15} aria-hidden="true" /></a>
					</div>
				</section>

				<section className="section-shell section-block skills-section" id="skills" aria-labelledby="skills-title">
					<div className="section-topline">
						<div>
							<SectionLabel number="02">What I’m learning to use</SectionLabel>
							<h2 id="skills-title">Tools & <span>foundations</span></h2>
						</div>
						<p className="section-note">A growing toolkit, built through practice.</p>
					</div>
					<div className="skill-groups">
						{skillGroups.map(({ title, skills }, index) => (
							<div className="skill-row" key={title}>
								<span className="skill-index">0{index + 1}</span>
								<h3>{title}</h3>
								<div className="skill-list">{skills.map((skill) => <span className="skill-tag" key={skill}>{skill}</span>)}</div>
							</div>
						))}
					</div>
				</section>

				<section className="section-shell section-block projects-section" id="projects" aria-labelledby="projects-title">
					<div className="section-topline">
						<div>
							<SectionLabel number="03">Selected work</SectionLabel>
							<h2 id="projects-title">Projects in <span>progress.</span></h2>
						</div>
						<p className="section-note">The next good idea starts with a first build.</p>
					</div>
					<article className="project-placeholder">
						<div className="project-preview" aria-hidden="true">
							<div className="preview-top"><span /><span /><span /><i>PROJECT PREVIEW</i></div>
							<div className="preview-content"><div className="preview-mark"><Code2 size={34} /></div><span>YOUR NEXT BUILD</span><div className="preview-lines"><i /><i /><i /></div></div>
							<div className="preview-corner">01 / —</div>
						</div>
						<div className="project-details">
							<p className="eyebrow"><span className="status-dot" /> Showcase opening soon</p>
							<h3>Making room for<br />work worth sharing.</h3>
							<p>No project details or repository links have been provided yet. This space is ready for real work as it takes shape.</p>
							<div className="project-metadata">
								<span>Project name <strong>To be added</strong></span>
								<span>Technologies <strong>To be added</strong></span>
								<span>Repository <strong>Not provided</strong></span>
							</div>
						</div>
					</article>
				</section>

				<section className="competitive-band" id="competitive" aria-labelledby="competitive-title">
					<div className="section-shell competitive-inner">
						<div className="competitive-intro">
							<SectionLabel number="04">Practice makes progress</SectionLabel>
							<h2 id="competitive-title">Problem solving,<br /><span>one challenge at a time.</span></h2>
							<p>Competitive programming helps me practice breaking down problems, reasoning carefully, and learning from each attempt. My profiles are the best place to follow along.</p>
							<span className="stats-note">Ratings and solved counts are omitted until verified.</span>
						</div>
						<div className="profile-list">
							{profiles.slice(1).map((profile, index) => <ProfileLink key={profile.name} profile={profile} index={index} />)}
						</div>
					</div>
				</section>

				<section className="section-shell section-block education-section" id="education" aria-labelledby="education-title">
					<div className="section-topline">
						<div>
							<SectionLabel number="05">Where it starts</SectionLabel>
							<h2 id="education-title">Education & <span>direction</span></h2>
						</div>
					</div>
					<div className="education-layout">
						<div className="education-entry">
							<span className="timeline-dot" />
							<div><p className="education-date">Started September 2026</p><h3>B.Sc. in Computer Science and Engineering</h3><p>Daffodil International University <span>· DIU</span></p></div>
						</div>
						<div className="learning-goals">
							<p className="eyebrow">Currently working toward</p>
							<ul>{learningGoals.map((goal) => <li key={goal}>{goal}</li>)}</ul>
							<p className="goal-footnote">Learning goals, not claimed achievements.</p>
						</div>
					</div>
				</section>

				<section className="contact-band" id="contact" aria-labelledby="contact-title">
					<div className="section-shell contact-inner">
						<div>
							<SectionLabel number="06">Have something in mind?</SectionLabel>
							<h2 id="contact-title">Let’s start a<br /><span>conversation.</span></h2>
							<p className="contact-description">For opportunities, collaboration, or a good conversation about building things.</p>
						</div>
						<div className="contact-details">
							<div className="contact-item"><span>Email</span><strong>Address not provided yet</strong></div>
							<div className="contact-item"><span>LinkedIn</span><strong>Profile not provided yet</strong></div>
							<a className="contact-github" href="https://github.com/barnomoy" target="_blank" rel="noreferrer"><Github size={17} aria-hidden="true" /> Find me on GitHub <ArrowUpRight size={15} aria-hidden="true" /></a>
						</div>
					</div>
				</section>
			</main>

			<footer className="site-footer">
				<div className="section-shell footer-inner">
					<a className="wordmark footer-wordmark" href="#home"><span className="wordmark-mark">B<span>.</span></span><span className="wordmark-name">Barnomoy Biswas</span></a>
					<p>Built with curiosity, consistency, and a passion for learning.</p>
					<div className="footer-meta">
						<span>© {new Date().getFullYear()} Barnomoy Biswas</span>
						<div>{profiles.map(({ name, href, handle }) => href
							? <a key={name} href={href} target="_blank" rel="noreferrer">{name}</a>
							: <span className="profile-placeholder" key={name} title={handle}>{name}</span>)}</div>
					</div>
				</div>
			</footer>
		</>
	);
}

export default App;
