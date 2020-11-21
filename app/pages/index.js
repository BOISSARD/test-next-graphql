import Link from 'next/link'

export default function Home() {
	return (
		<div className="container">
			{/* <Box justifyContent="center">
      </Box > */}
        <h1 className="title">
            Welcome on this <span className="text-primary">skill TEST</span> !
		</h1>

		<style jsx>{`
		.container {
			height: calc(100vh - 100px);
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
		.title {
			margin: 0 0 2rem 0;
			line-height: 1.15;
			font-size: 4rem;
		}
		`}</style>
		</div>
	)
}
