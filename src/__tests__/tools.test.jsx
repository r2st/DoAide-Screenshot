import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import WebsiteCapture from '../components/WebsiteCapture/WebsiteCapture';
import ImageAnnotator from '../components/ImageAnnotator/ImageAnnotator';
import ImageCropper from '../components/ImageCropper/ImageCropper';
import ScreenshotToPdf from '../components/ScreenshotToPdf/ScreenshotToPdf';

describe('WebsiteCapture', () => {
  it('renders the capture form', () => {
    render(
      <MemoryRouter>
        <WebsiteCapture />
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText(/enter website url/i)).toBeTruthy();
    expect(screen.getByText('Capture')).toBeTruthy();
    expect(screen.getByText('Website Screenshot Capture')).toBeTruthy();
  });

  it('has disabled capture button when URL is empty', () => {
    render(
      <MemoryRouter>
        <WebsiteCapture />
      </MemoryRouter>
    );
    const captureBtn = screen.getByText('Capture');
    expect(captureBtn.disabled).toBe(true);
  });

  it('enables capture button when URL is entered', () => {
    render(
      <MemoryRouter>
        <WebsiteCapture />
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText(/enter website url/i);
    fireEvent.change(input, { target: { value: 'github.com' } });
    const captureBtn = screen.getByText('Capture');
    expect(captureBtn.disabled).toBe(false);
  });
});

describe('ImageAnnotator', () => {
  it('renders upload prompt', () => {
    render(
      <MemoryRouter>
        <ImageAnnotator />
      </MemoryRouter>
    );
    expect(screen.getByText('Image Annotator')).toBeTruthy();
    expect(screen.getByText(/upload an image to annotate/i)).toBeTruthy();
  });

  it('renders all annotation tools', () => {
    render(
      <MemoryRouter>
        <ImageAnnotator />
      </MemoryRouter>
    );
    const tools = ['Rectangle', 'Circle', 'Arrow', 'Line', 'Draw', 'Highlight', 'Text', 'Blur'];
    tools.forEach(tool => {
      expect(screen.getByText(new RegExp(tool))).toBeTruthy();
    });
  });
});

describe('ImageCropper', () => {
  it('renders upload prompt', () => {
    render(
      <MemoryRouter>
        <ImageCropper />
      </MemoryRouter>
    );
    expect(screen.getByText('Image Cropper')).toBeTruthy();
    expect(screen.getByText(/upload an image to crop/i)).toBeTruthy();
  });

  it('renders aspect ratio options', () => {
    render(
      <MemoryRouter>
        <ImageCropper />
      </MemoryRouter>
    );
    expect(screen.getByText('Free')).toBeTruthy();
    expect(screen.getByText('1:1')).toBeTruthy();
    expect(screen.getByText('16:9')).toBeTruthy();
  });
});

describe('ScreenshotToPdf', () => {
  it('renders upload prompt', () => {
    render(
      <MemoryRouter>
        <ScreenshotToPdf />
      </MemoryRouter>
    );
    expect(screen.getByText('Screenshot to PDF')).toBeTruthy();
    expect(screen.getByText(/add screenshots to convert to pdf/i)).toBeTruthy();
  });

  it('renders page size options', () => {
    render(
      <MemoryRouter>
        <ScreenshotToPdf />
      </MemoryRouter>
    );
    expect(screen.getByText('A4')).toBeTruthy();
    expect(screen.getByText('Letter')).toBeTruthy();
    expect(screen.getByText('A3')).toBeTruthy();
  });

  it('has disabled export button with no images', () => {
    render(
      <MemoryRouter>
        <ScreenshotToPdf />
      </MemoryRouter>
    );
    const exportBtn = screen.getByText(/download pdf/i);
    expect(exportBtn.disabled).toBe(true);
  });
});
