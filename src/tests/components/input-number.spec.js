import React from 'react';
import { shallow, mount } from 'enzyme';
import { fakeSchedulers } from 'rxjs-marbles/jest';
import { InputNumber } from 'components';

const response = { values: { COLLECTED: '1' } };

const defaultProps = { id: 'id', label: 'label', response };

describe('input-number', () => {
	const handleChange = jest.fn();

	it('minimalist renders without crashing', () => {
		shallow(<InputNumber {...defaultProps} handleChange={handleChange} />);
	});

	it('renders without crashing', () => {
		shallow(
			<InputNumber
				{...defaultProps}
				handleChange={handleChange}
				min={0}
				max={100}
				mandatory={true}
				unit="euros"
				validators={[(value) => (value ? undefined : 'Value is mandatory')]}
			/>
		);
	});

	it('returns readOnly & disabled & autoComplete component', () => {
		const wrapper = mount(
			<InputNumber
				{...defaultProps}
				handleChange={handleChange}
				max={100}
				readOnly
				disabled
				autoComplete
			/>
		);
		expect(wrapper.find('input').at(0).prop('readOnly')).toBe(true);
	});

	it('returns readOnly component', () => {
		const wrapper = mount(
			<InputNumber
				{...defaultProps}
				handleChange={handleChange}
				min={0}
				readOnly
			/>
		);
		expect(wrapper.find('input').at(0).prop('readOnly')).toBe(true);
	});

	it('returns management component', () => {
		shallow(
			<InputNumber {...defaultProps} handleChange={handleChange} management />
		);
	});

	it('renders firing useEffect', () => {
		const wrapper = mount(
			<InputNumber {...defaultProps} handleChange={handleChange} />
		);
		wrapper.setProps({ focused: true });
	});

	it('returns enabled component', () => {
		const wrapper = mount(
			<InputNumber
				{...defaultProps}
				handleChange={handleChange}
				min={0}
				max={100}
				mandatory={true}
				decimals={1}
			/>
		);
		expect(wrapper.find('input').at(0).prop('readOnly')).toBe(false);
	});

	it('should trigger the change event', () => {
		fakeSchedulers(() => {
			const wrapperMin = mount(
				<InputNumber {...defaultProps} handleChange={handleChange} min={0} />
			);
			wrapperMin
				.find('input')
				.at(0)
				.simulate('change', {
					target: {
						value: '-10',
					},
				});

			expect(handleChange).toHaveBeenCalled();
			expect(handleChange).toHaveBeenCalledWith({ '': '-10' });
			const wrapperMax = mount(
				<InputNumber {...defaultProps} handleChange={handleChange} max={100} />
			);
			wrapperMax
				.find('input')
				.at(0)
				.simulate('change', {
					target: {
						value: '1000',
					},
				});

			expect(handleChange).toHaveBeenCalled();
			expect(handleChange).toHaveBeenCalledWith({ '': '1000' });
			const wrapperMinMax = mount(
				<InputNumber
					{...defaultProps}
					handleChange={handleChange}
					min={5}
					max={100}
				/>
			);
			wrapperMinMax
				.find('input')
				.at(0)
				.simulate('change', {
					target: {
						value: '10',
					},
				});

			expect(handleChange).toHaveBeenCalled();
			expect(handleChange).toHaveBeenCalledWith({ '': '10' });
		});
	});

	it('render message error', () => {
		fakeSchedulers(() => {
			const wrapperMin = shallow(
				<InputNumber {...defaultProps} handleChange={handleChange} min={1} />
			);

			expect(wrapperMin.find('.lunatic-input-number-errors').text()).toEqual(
				''
			);
			wrapperMin.find('input').simulate('change', {
				target: {
					value: '-1',
				},
			});

			expect(wrapperMin.find('.lunatic-input-number-errors').text()).toEqual(
				'La valeur doit être supérieure à 1'
			);

			const wrapperMax = shallow(
				<InputNumber {...defaultProps} handleChange={handleChange} max={9.8} />
			);
			expect(wrapperMax.find('.lunatic-input-number-errors').text()).toEqual(
				''
			);
			wrapperMax.find('input').simulate('change', {
				target: {
					value: '10',
				},
			});

			expect(wrapperMax.find('.lunatic-input-number-errors').text()).toEqual(
				'La valeur doit être inférieure à 9.8'
			);

			const wrapperMinMax = shallow(
				<InputNumber
					{...defaultProps}
					handleChange={handleChange}
					min={1}
					max={10}
				/>
			);
			expect(wrapperMinMax.find('.lunatic-input-number-errors').text()).toEqual(
				''
			);

			wrapperMinMax.find('input').simulate('change', {
				target: {
					value: '20',
				},
			});

			expect(wrapperMinMax.find('.lunatic-input-number-errors').text()).toEqual(
				'La valeur doit être comprise entre 1 et 10'
			);
		});
	});
});
