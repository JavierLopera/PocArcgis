import { Component, State, Prop, h, Host } from '@stencil/core';

@Component({
	tag: 'correos-ui-tracking-stepper',
	styleUrls: ['ui-tracking-stepper.theme.scss', 'ui-tracking-stepper.scss'],
	shadow: false,
	scoped: true
})
export class UiTrackingStepper {

	/* Puntos de siguimiento */
	@Prop() points: any[] | string;

	/* Tipo de gráfico */
	@Prop() type: 'horizontal' | 'vertical' = 'horizontal';

	@State() trackingChildsOpened: {} = {};

	refinedPoints;

	openChildHandler = childId => {
		this.trackingChildsOpened[childId] = !this.trackingChildsOpened[childId];
		this.trackingChildsOpened = { ...this.trackingChildsOpened };
	};

	checkPrevStatus = (points, point, n, parent) => {
		/* Detect if parent is wrong to set all as wrong, if not check if has prev brother, if not check his prev parent status */
		let status = null;
		if (parent && this.refinedPoints.indexOf(parent) !== -1) {
			const parentPoint = this.refinedPoints[this.refinedPoints.indexOf(parent)];
			const error = !parentPoint.done && parentPoint.type === 'primary';
			status = `prev${error ? 'Error' : (parentPoint.done ? 'Done' : 'Undone')}`;
		} else if (points[n - 1]) {
			const error = !point.done && (point.type === "primary" || point.type === "error");
			status = n - 1 >= 0 ? `prev${point.done || error ? 'Done' : 'Undone'}` : false;
		}
		return status;
	};

	checkNextStatus = (points, n, parent) => {
		/* Detect if has children are opened and his status, if not his next brother and if not check his next parent status */
		let status = null;
		if (points[n].childs && this.trackingChildsOpened[n]) {
			const error = !points[n].done && points[n].type === "primary";
			status = `next${error ? 'Error' : (points[n].childs[0].done ? 'Done' : 'Undone')}`;
		} else if (parent && this.refinedPoints.indexOf(parent) !== -1 && this.refinedPoints[this.refinedPoints.indexOf(parent) + 1]) {
			let error = (!parent.done && parent.type === "primary") || (!points[n].done && points[n].type === "primary");
			const isLastChild = n === points.length - 1;
			if (isLastChild && error) error = false;
			if (!error && points[n + 1]) {
				status = n + 1 < points.length ? 'nextDone' : false;
			} else {
				status = `next${error ? 'Error' : (this.refinedPoints[this.refinedPoints.indexOf(parent) + 1].done ? 'Done' : 'Undone')}`;
			}
		} else if (points[n + 1]) {
			status = n + 1 < points.length ? `next${points[n + 1].done || points[n + 1].type === "primary" ? 'Done' : 'Undone'}` : false;
		}
		return status;
	};

	/** trackingStepper element builder and childs */
	trackingStepInfoBuilder = (points) => {
		let appendInfo = null;
		if (this.type === 'horizontal') {
			{
				points.map(point => {
					if (point.type === "primary") {
						appendInfo = (
							<div class={`correos-ui-tracking-stepper__appendInfo`}>
								{point.title && (<span class="correos-ui-tracking-stepper__title">{point.title}</span>)}
								{point.desc && (<span class="correos-ui-tracking-stepper__desc">{point.desc}</span>)}
							</div>
						)
					}
				})
			}
		}
		return appendInfo;
	};
	trackingStepBuilder = (points, point, n, parent = null) => {
		if (point.childs && typeof this.trackingChildsOpened[n] === 'undefined') this.trackingChildsOpened[n] = point.type === 'primary';
		const prevStatus = this.checkPrevStatus(points, point, n, parent);
		const nextStatus = this.checkNextStatus(points, n, parent);
		const itemPoint = (
			<div class="correos-ui-tracking-stepper__container">
				<button class="correos-ui-tracking-stepper__parentcontainer" onClick={() => this.openChildHandler(n)}>
					<div class="correos-ui-tracking-stepper__parentcontainer_stepbody">
						<div class={`correos-ui-tracking-stepper__step ${prevStatus} ${nextStatus} ${point.type === 'primary' && !point.done ? 'error' : point.type}`}>
							<span class={`step ${point.done && 'done'}`}>
								{point.icon && (point.type === 'primary' || this.type === 'vertical')
									&& (<i class={point.icon}></i>)}
							</span>
						</div>
						{this.type === 'vertical' && (
							<div class="correos-ui-tracking-stepper__body">
								{point.title && (<span class="correos-ui-tracking-stepper__title">{point.title}</span>)}
								{point.date && (<span class="correos-ui-tracking-stepper__date">{point.date}</span>)}
								{point.desc && (<span class="correos-ui-tracking-stepper__desc">{point.desc}</span>)}
							</div>
						)}
					</div>
					{this.type === 'vertical' && point.childs && (
						<div class="correos-ui-tracking-stepper__childsbutton"
							tabindex="0"
							role="button"
						>
							<i
								class={`icon-drop ${this.trackingChildsOpened[n] && 'opened'}`}
							/>
						</div>
					)}
				</button>

				{this.type === 'vertical' && (
					<div class="correos-ui-tracking-stepper__childcontainer">
						{point.childs && (
							<div class={`correos-ui-tracking-stepper__childsbody ${this.trackingChildsOpened[n] ? 'opened' : 'closed'}`}>
								{point.childs.map((pointChilds, nChilds) => this.trackingStepBuilder(point.childs, pointChilds, nChilds, point))}
							</div>
						)}
					</div>
				)}
			</div>
		);
		return itemPoint;
	};
	trackingSteppersBuilder = (points) => (
		<div class={`correos-ui-tracking-stepper__root ${this.type}`}>
			<div class="correos-ui-tracking-stepper__root-graphic">
				{points.map((point, n) => this.trackingStepBuilder(points, point, n))}
			</div>
			{this.trackingStepInfoBuilder(points)}
		</div>
	);

	render() {
		if ((['trackingPointsElement[]', 'string', 'object']).includes(typeof this.points)) {
			this.refinedPoints = this.points;
			if (typeof this.points === 'string') {
				try {
					this.refinedPoints = JSON.parse(this.points.replace(/&quot;/g, '"'));
				} catch (error) {
					throw new Error('Parameter "points" has incorrect string format');
				}
			}
		} else {
			throw new Error('Parameter "points" has incorrect format allowed');
		}

		return <Host>{this.trackingSteppersBuilder(this.refinedPoints)}</Host>
	}
}
