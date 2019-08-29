import React from 'react';
// import classnames from 'classnames';
import ClayList from '@clayui/list';
import Expose from './Expose.es';

import './add-or-create.scss';

function Suggestions({list, selected, action}) {
	return (
		<>
			<ClayList.Header>Add an existing specification</ClayList.Header>
			{list.map((s, i) => (
				<ClayList.Item flex key={i} className={selected === (i + 1) ? 'is-selected' : ''}>
					<ClayList.ItemField expand>
						<ClayList.ItemTitle>{s}</ClayList.ItemTitle>
					</ClayList.ItemField>
					<ClayList.ItemField>
						<button className="btn btn-monospaced btn-sm btn-primary" type="button" onClick={() => action(i + 1)}>
							<svg className="lexicon-icon lexicon-icon-plus" focusable="false" role="presentation">
								<use href="./icons.svg#plus"></use>
							</svg>
						</button>
					</ClayList.ItemField>
				</ClayList.Item>
			))}
		</>
	);
}

export default class AddOrCreate extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			active: props.active,
			focus: false,
			selected: 0, 
			suggestions: [],
			value: '',
		}
		this.card = React.createRef();
		this.input = React.createRef();

		this.handleKeyDown = this.handleKeyDown.bind(this);
	}

	focus() {
		this.setState({
			active: true,
			focus: true,
		});
		window.addEventListener('keydown', this.handleKeyDown);
		this.card.current.scrollIntoView({behavior: "smooth"});
		this.props.onFocus && this.props.onFocus();
	}

	blur() {
		this.setState({ focus: false });
		window.removeEventListener('keydown', this.handleKeyDown);
	}

	clear() {
		this.setState({
			value: '',
			selected: 0
		});
	}

	empty() {
		this.clear();
		this.input.current.focus();
	}

	getSelection(step) {
		return (this.state.suggestions.length + 1 + this.state.selected + step) % (this.state.suggestions.length + 1);
	}

	handleKeyDown(e) {
		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault();
				this.setState({ selected: this.getSelection(1) });
				break;
			case 'ArrowUp':
				e.preventDefault();
				this.setState({ selected: this.getSelection(-1) });
				break;
			case 'Enter':
				this.submit();
				break;
		}
	}

	shouldComponentUpdate(nextProps) {
		if (!nextProps.active) {
			this.input.current.blur();
		}
		return true;
	}

	submit(el = this.state.selected) {
		if (el > 0) {
			this.props.onSubmit({
				action: 'add',
				value: this.state.suggestions[el - 1]
			});
		} else if (this.state.value) {
			this.props.onSubmit({
				action: 'create',
				value: this.state.value
			});
		}
		this.clear();
	}

	onChange(e) {
		this.setState({
			selected: 0,
			focus: true,
			suggestions: this.props.onSearch(e.target.value),
			value: e.target.value,
		});
	}

	componentDidUpdate() {
		setTimeout(() => this.card.current.scrollIntoView({behavior: "smooth"}), 0);
	}

	render() {
		return (
			<div className="card add-or-create" ref={this.card}>
				<div className="card-header">
					Add new option
				</div>
				<div className="card-body">
					<div className="input-group">
						<div className="input-group-item">
							<input
								className="form-control input-group-inset input-group-inset-after"
								placeholder="Find existing option or add a new one"
								type="text"
								onFocus={e => this.focus(e)}
								onBlur={e => this.blur(e)}
								onChange={e => this.onChange(e)}
								value={this.state.value}
								ref={this.input}
							/>
							<span className="input-group-inset-item input-group-inset-item-after">
								{this.state.value &&
									<button
										className="btn btn-unstyled"
										type="button"
										onClick={e => this.empty(e)}
									>
										<svg className="lexicon-icon lexicon-icon-times" focusable="false" role="presentation">
											<use href="./icons.svg#times" />
										</svg>
									</button>
								}
							</span>
						</div>
					</div>
				</div>
				{this.state.value && this.state.active &&
					<div className="card-body">
						<ClayList>
							<ClayList.Header>Create new specification</ClayList.Header>
							<ClayList.Item flex className={this.state.selected === 0 ? 'is-selected' : ''}>
								<ClayList.ItemField expand>
									<ClayList.ItemTitle>{this.state.value}</ClayList.ItemTitle>
								</ClayList.ItemField>

								<ClayList.ItemField>
									<button className="btn btn-link btn-sm" type="button" onClick={() => this.submit(0)}>Create new specification</button>
								</ClayList.ItemField>
							</ClayList.Item>

							{this.state.suggestions.length ? <Suggestions list={this.state.suggestions} selected={this.state.selected} action={e => this.submit(e)} /> : null}
						</ClayList>
					</div>
				}
			</div>
		);
	}
}


React.forwardRef((props, ref) => {
	const [active, setActive] = React.useState(false);
	
	function closeAndSubmit(e) {
		props.onSubmit(e);
		setActive(false)
	}

  return (
		<Expose active={active} onClose={() => setActive(false)}>
			<AddOrCreate
				{...props}
				active={active}
				onSubmit={closeAndSubmit}
				onFocus={() => setActive(true)}
				innerRef={ref}
			/>
		</Expose>
  );
});
