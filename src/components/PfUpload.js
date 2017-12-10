import React, { Component } from 'react';
import classNames from 'classnames';

export default class extends Component {
  saveFileInput = (input) => {
    this.fileInput = input
  };

  handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.props.handleSuccess(reader.result);
      }
      // start uploadfile and convert to base64
      this.props.handleStartUpload()
      reader.readAsDataURL(file);
    } else {
      this.props.handleError();
    }
  }

  handleClick = () => {
    const el = this.fileInput;
    if (!el) {
      return;
    }

    el.click();
  }

  render() {
    const { 
      component: PfComponent, 
      children,
      disabled,
      prefixCls,
      className,
      style,
      accept,
      multiple,
    } = this.props;

    // construct class name
    const cls = classNames({
      [prefixCls]: true,
      [`${prefixCls}-disabled`]: disabled,
      [className]: className,
    });

    // handle click event
    const events = disabled 
      ? {} 
      : {
        onClick: this.handleClick,
      };

    return (
      <PfComponent
        {...events}
        className={cls}
        role="button"
        style={style}
      >
        <input
          type="file"
          ref={this.saveFileInput}
          style={{ display: 'none' }}
          onChange={this.handleChange}
          accept={accept}
          multiple={multiple}
        />
        {children}
      </PfComponent>
    );
  }
}