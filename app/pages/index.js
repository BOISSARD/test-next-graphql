import Link from 'next/link'

export default function Home() {
	return (
		<div className="container">
        <h1 className="title">
            Welcome on this <span className="text-primary">skill TEST</span> !
		</h1>
            <style jsx>{`
                .title {
                    margin: 0 0 2rem 0;
                    line-height: 1.15;
                    font-size: 4rem;
                }
            `}</style>
		</div>
	)
}
