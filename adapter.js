import React from "react"

export default class Elmo extends React.Component {

	componentDidMount() {
		const app = this.props.src.embed(this.node, this.props.flags)

		this.send(app)
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props !== prevProps) {
			const app = this.props.src.embed(this.node, this.props.flags)
			this.send(app)
		}
	}
	
	embedSend() {
		this.send(
			this.props.src.embed(this.node, this.props.flags)
		)
	}

	send(app) {
		if (typeof this.props.sends !== "undefined") {
			return this.props.sends.map(send => app.ports[send.portName].send(send.payload))
		}
	}

	subscribe(app) {
		if (typeof this.props.subscriptions !== "undefined") {
			return this.props.subscriptions.map(sub => app.ports[sub.portName].subscribe(sub.payload))
		}
	}

	render() {
		return <div ref={ref => (this.node = ref)} />
	}
	
}
