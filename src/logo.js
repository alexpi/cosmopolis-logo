const { tween, listen, styler, parallel, keyframes, easing, timeline } = popmotion;
const animatedLogo = document.querySelector('.animated-logo');

const elems = {
	c: {
		maskLeft: styler(animatedLogo.querySelector('#C-mask-left polygon')),
		maskRight: styler(animatedLogo.querySelector('#C-mask-right polygon'))
	},
	o: {
		top: styler(animatedLogo.querySelector('#O-top')),
		bottom: styler(animatedLogo.querySelector('#O-bottom')),
		left: styler(animatedLogo.querySelector('#O-left')),
		right: styler(animatedLogo.querySelector('#O-right')),
		mult: 30
	},
	s: {
		path: styler(animatedLogo.querySelector('#S path')),
		duration: 500
	},
	m: {
		middle: styler(animatedLogo.querySelector('#M-middle')),
		left: styler(animatedLogo.querySelector('#M-left')),
		right: styler(animatedLogo.querySelector('#M-right')),
		mult: 20
	},
	o2: {
		top: styler(animatedLogo.querySelector('#O2-top')),
		bottom: styler(animatedLogo.querySelector('#O2-bottom')),
		duration: 760
	},
	p: {
		top: styler(animatedLogo.querySelector('#P-top')),
		stem: styler(animatedLogo.querySelector('#P-stem')),
		bottom: styler(animatedLogo.querySelector('#P-bottom')),
		duration: 270
	},
	o3: {
		inner: styler(animatedLogo.querySelector('#O3-inner')),
		outer: styler(animatedLogo.querySelector('#O3-outer')),
		duration: 700
	},
	l: {
		top: styler(animatedLogo.querySelector('#L-top')),
		stem: styler(animatedLogo.querySelector('#L-stem')),
		duration: 700
	},
	i: {
		blue: styler(animatedLogo.querySelector('#I .blue')),
		red: styler(animatedLogo.querySelector('#I .red')),
		duration: 360,
		mult: 16
	},
	s2: {
		path: styler(animatedLogo.querySelector('#S2-path')),
		duration: 500
	}
}

const duration = 300;
const ease = easing.easeInOut;
const flip = 1;

const randomBoolean = () => Math.random() < 0.5 ? false : true;
const randomMinusPlusOne = () => Math.random() < 0.5 ? Math.random() * -1 : Math.random() * 1;
const randomPos = range => randomMinusPlusOne() * range;
const randomSize = (range, min) => Math.random() * range + min + 'px';

const randomMinToOne = min => {
	let rand = Math.random();
	while (rand < min) rand = Math.random();
	return rand;
}

const animating = e => {
	if (e.target.classList.contains('animating')) return true;
	e.target.classList.add('animating');
}

const complete = e => e.target.classList.remove('animating');

const strokeAnimation = (elem, e) => {
	let randomTo = Math.random();

	timeline([
		[
			{ track: 'length', from: 1, to: 0.3, duration: elems.s.duration, ease },
			{ track: 'offset', from: 0, to: 0.3, duration: elems.s.duration, ease },
		],
		{ track: 'offset', from: 0.3, to: randomTo, duration: elems.s.duration, ease },
		[
			{ track: 'length', from: 0.3, to: 1, duration: elems.s.duration, ease },
			{ track: 'offset', from: randomTo, to: 0, duration: elems.s.duration, ease },
		]
	]).start({
		update: (v) => {
			elem.set('pathLength', v.length);
			elem.set('pathOffset', v.offset);
		},
		complete: () => complete(e)
	})
}

listen(animatedLogo, 'mouseover touchstart')
	.start(e => {
		if (e.target.id === 'C') {
			if (animating(e)) return;

			parallel(
				tween({
					from: elems.c.maskLeft.get('points'),
					to: '-3.5,-8.8 -1.1,17.6 18.4,36 34.9,36 80,0',
					duration,	ease,	flip
				}),
				tween({
					from: elems.c.maskRight.get('points'),
					to: '25.6,81.5 61.1,81.5 69,76 45,51.5 34.9,35.9',
					duration, ease,	flip
				})
			).start({
				update: ([maskLeftTween, maskRightTween]) => {
					elems.c.maskLeft.set('points', maskLeftTween);
					elems.c.maskRight.set('points', maskRightTween);
				},
				complete: () => complete(e)
			});
		};

		if (e.target.id === 'O') {
			if (animating(e)) return;

			const rs = [];
			for (let i = 0; i < 4; i++) {	rs.push(randomSize(20, 10)) };

			const tweenCircle = (circle, i) => {
				return tween({
					from: {
						x: circle.get('x'),
						y: circle.get('y'),
						rx: circle.get('rx'),
						ry: circle.get('ry')
					},
					to: { x: randomPos(elems.o.mult), y: randomPos(elems.o.mult), rx: rs[i], ry: rs[i] },
					duration, ease, flip
				});
			};

			const updateItems = (circle, prop) => {
				circle.set('x', prop.x);
				circle.set('y', prop.y);
				circle.set('rx', prop.rx);
				circle.set('ry', prop.ry);
			};

			parallel(
				tweenCircle(elems.o.top, 0),
				tweenCircle(elems.o.bottom, 1),
				tweenCircle(elems.o.left, 2),
				tweenCircle(elems.o.right, 3)
			).start({
				update: ([top, bottom, left, right]) => {
					updateItems(elems.o.top, top);
					updateItems(elems.o.bottom, bottom);
					updateItems(elems.o.left, left);
					updateItems(elems.o.right, right);
				},
				complete: () => complete(e)
			});
		};

		if (e.target.id === 'S') {
			if (animating(e)) return;

			strokeAnimation(elems.s.path, e);
		};

		if (e.target.id === 'M') {
			if (animating(e)) return;

			const straight = randomBoolean();

			const to = () => {
				const dist = (Math.random() * 80) + 40;

				const start = [randomPos(elems.m.mult), 72];
				const topLeft = randomPos(elems.m.mult);
				const topRight = [randomPos(elems.m.mult) + dist, straight ? topLeft : randomPos(elems.m.mult)];
				const middle = [
					Math.abs(start[0] + topRight[0]) / 2,
					topRight[1] + (Math.random() * elems.m.mult) + elems.m.mult
				];
				const end = 72 - topRight[1];

				return `M${start} V${topLeft} L${middle} ${topRight} v${end}`;
			}

			parallel(
				tween({ from: elems.m.left.get('d'), to: to(), duration, ease, flip }),
				tween({ from: elems.m.middle.get('d'), to: to(), duration, ease, flip }),
				tween({ from: elems.m.right.get('d'), to: to(), duration, ease, flip })
			).start({
				update: ([left, middle, right]) => {
					elems.m.left.set('d', left);
					elems.m.middle.set('d', middle);
					elems.m.right.set('d', right);
				},
				complete: () => complete(e)
			});
		};

		if (e.target.id === 'O2') {
			if (animating(e)) return;

			parallel(
				keyframes({
					values: [0, 2, -2, 5, -5, 2, -2, 0],
					duration: elems.o2.duration, ease
				}),
				keyframes({
					values: [0, -2, 2, -5, 5, -2, 2, 0],
					duration: elems.o2.duration, ease
				})
			).start({
				update: ([top, bottom]) => {
					elems.o2.top.set('x', top);
					elems.o2.bottom.set('x', bottom);
				},
				complete: () => complete(e)
			})
		};

		if (e.target.id === 'P') {
			if (animating(e)) return;

			timeline([
				{ track: 'top', to: 20, ease },
				[
					{ track: 'top', to: -15 },
					{ track: 'stem', from: { y: 0, scaleY: 1 }, to: { y: -18, scaleY: 1.5 }, ease },
					{ track: 'bottom', to: -12, ease }
				],
				[
					{ track: 'top', to: 15, duration: elems.p.duration, ease },
					{ track: 'stem', to: { y: 0, scaleY: 1 }, duration: elems.p.duration, ease },
					{ track: 'bottom', to: 0, duration: elems.p.duration, ease },
				],
				{ track: 'top', to: 0, ease }
			]).start({
				update: (v) => {
					elems.p.top.set('y', v.top);
					if (v.stem) {
						elems.p.stem.set('y', v.stem.y);
						elems.p.stem.set('scaleY', v.stem.scaleY);
					}
					elems.p.bottom.set('y', v.bottom);
				},
				complete: () => complete(e)
			})
		};

		if (e.target.id === 'O3') {
			if (animating(e)) return;

			const outerStart = elems.o3.outer.get('r');
			const innerStart = elems.o3.inner.get('r');

			parallel(
				keyframes({
					values: [outerStart, 38, 28, 32, 30, outerStart],
					duration: elems.o3.duration, ease
				}),
				keyframes({
					values: [innerStart, 16, 24, 18, innerStart],
					duration: elems.o3.duration, ease
				})
			).start({
				update: ([outer, inner]) => {
					elems.o3.outer.set('r', outer);
					elems.o3.inner.set('r', inner);
				},
				complete: () => complete(e)
			})
		};

		if (e.target.id === 'L') {
			if (animating(e)) return;

			elems.l.top.set('originX', '14px');
			elems.l.top.set('originY', '67px');

			parallel(
				keyframes({
					values: [0, -20, 20, 0],
					times: [0, 0.3, 0.7, 1],
					duration: elems.l.duration
				}),
				keyframes({
					values: [
						'M14.6,65 C14.6,65 14.6,28 14.6,8',
						'M14.6,65 C14.6,65 17,34 -7,11',
						'M14.6,65 C14.6,65 13,36 37.3,9',
						'M14.6,65 C14.6,65 14.6,28 14.6,8',
					],
					times: [0, 0.3, 0.7, 1],
					duration: elems.l.duration
				})
			).start({
				update: ([top, stem]) => {
					elems.l.top.set('rotateZ', top);
					elems.l.stem.set('d', stem);
				},
				complete: () => complete(e)
			});
		};

		if (e.target.id === 'I') {
			if (animating(e)) return;

			let randomBlueValues = [];
			let randomRedValues = [];

			for (let i = 0; i < 10; i++) {
				randomBlueValues.push(randomMinusPlusOne() * elems.i.mult);
				randomRedValues.push(randomMinusPlusOne() * elems.i.mult);
			};

			parallel(
				keyframes({
					values: [0, 1, 0],
					times: [0.05, 0.95, 1],
					duration: elems.i.duration
				}),
				keyframes({ values: randomBlueValues, duration: elems.i.duration }),
				keyframes({ values: randomRedValues, duration: elems.i.duration	})
			).start({
				update: ([opacity, blue, red]) => {
					elems.i.blue.set('opacity', opacity)
					elems.i.red.set('opacity', opacity)
					elems.i.blue.set('x', blue)
					elems.i.red.set('x', red)
				},
				complete: () => complete(e)
			});
		};

		if (e.target.id === 'S2') {
			if (animating(e)) return;

			strokeAnimation(elems.s2.path, e);
		};
	});
