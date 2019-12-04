const { tween, listen, styler, parallel, keyframes, easing, chain, timeline } = popmotion;
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
		duration: 500,
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

			const rs = [randomSize(20, 10), randomSize(20, 10), randomSize(20, 10), randomSize(20, 10)];

			parallel(
				tween({ // top circle
					from: {
						x: elems.o.top.get('x'),
						y: elems.o.top.get('y'),
						rx: elems.o.top.get('rx'),
						ry: elems.o.top.get('ry')
					},
					to: { x: randomPos(elems.o.mult), y: randomPos(elems.o.mult),	rx: rs[0],	ry: rs[0] },
					duration, ease, flip
				}),
				tween({ // bottom circle
					from: {
						x: elems.o.bottom.get('x'),
						y: elems.o.bottom.get('y'),
						rx: elems.o.bottom.get('rx'),
						ry: elems.o.bottom.get('ry')
					},
					to: { x: randomPos(elems.o.mult), y: randomPos(elems.o.mult), rx: rs[1], ry: rs[1] },
					duration, ease, flip
				}),
				tween({ // left circle
					from: {
						x: elems.o.left.get('x'),
						y: elems.o.left.get('y'),
						rx: elems.o.left.get('rx'),
						ry: elems.o.left.get('ry')
					},
					to: { x: randomPos(elems.o.mult), y: randomPos(elems.o.mult), rx: rs[2], ry: rs[2] },
					duration, ease, flip
				}),
				tween({ // right circle
					from: {
						x: elems.o.right.get('x'),
						y: elems.o.right.get('y'),
						rx: elems.o.right.get('rx'),
						ry: elems.o.right.get('ry')
					},
					to: { x: randomPos(elems.o.mult), y: randomPos(elems.o.mult), rx: rs[3], ry: rs[3] },
					duration, ease, flip
				})
			).start({
				update: ([top, bottom, left, right]) => {
					elems.o.top.set('x', top.x);
					elems.o.top.set('y', top.y);
					elems.o.top.set('rx', top.rx);
					elems.o.top.set('ry', top.ry);

					elems.o.bottom.set('x', bottom.x);
					elems.o.bottom.set('y', bottom.y);
					elems.o.bottom.set('rx', bottom.rx);
					elems.o.bottom.set('ry', bottom.ry);

					elems.o.left.set('x', left.x);
					elems.o.left.set('y', left.y);
					elems.o.left.set('rx', left.rx);
					elems.o.left.set('ry', left.ry);

					elems.o.right.set('x', right.x);
					elems.o.right.set('y', right.y);
					elems.o.right.set('rx', right.rx);
					elems.o.right.set('ry', right.ry);
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
					elems.i.blue.set('x', blue)
					elems.i.red.set('opacity', opacity)
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
