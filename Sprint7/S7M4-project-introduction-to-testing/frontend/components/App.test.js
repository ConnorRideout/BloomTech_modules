import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from './App'
import langData from '../i18n/index.json'

const clear = require('console-clear')
clear()

describe('Module 4 Project Tests', () => {
    [['English', 'en'], ['Spanish', 'esp']].forEach(([language, langCode]) => {
        describe(`${language} Language`, () => {
            const selData = langData[langCode];
            // getByText
            getEntriesByKeyPrefix(selData, 'TEXT').forEach(([key, txt]) => {
                test(`${key} is visible`, () => {
                    render(<App lang={langCode} />)
                    expect(screen.getByText(txt)).toBeVisible()
                })
            });
            // getByLabelText
            getEntriesByKeyPrefix(selData, 'LABEL').forEach(([key, txt]) => {
                test(`${key} is visible`, () => {
                    render(<App lang={langCode} />)
                    expect(screen.getByLabelText(txt)).toBeVisible()
                })
            })
            // getByPlaceholderText
            getEntriesByKeyPrefix(selData, 'PLACEHOLDER').forEach(([key, txt]) => {
                test(`${key} is visible`, () => {
                    render(<App lang={langCode} />)
                    expect(screen.getByPlaceholderText(txt)).toBeVisible()
                })
            })
        })
    })
    // describe('English Language', () => {
    //     /*
    //       👉 TASK 1

    //       One test is done for you as an example.
    //     */
    //     //    test(`TEXT_HEADING_CREATE_ACCOUNT is visible`, () => {
    //     //        render(<App lang="en" />)
    //     //        expect(screen.getByText(enData.TEXT_HEADING_CREATE_ACCOUNT)).toBeVisible()
    //     //     })
    //     const enData = langData.en;
    //     // getByText
    //     getEntriesByKeyPrefix(enData, 'TEXT').forEach(([key, val]) => {
    //         test(`${key} is visible`, () => {
    //             render(<App lang="en" />)
    //             expect(screen.getByText(val)).toBeVisible()
    //         })
    //     });
    //     // getByLabelText
    //     getEntriesByKeyPrefix(enData, 'LABEL').forEach(([key, val]) => {
    //         test(`${key} is visible`, () => {
    //             render(<App lang="en" />)
    //             expect(screen.getByLabelText(val)).toBeVisible()
    //         })
    //     })
    //     // getByPlaceholderText
    //     getEntriesByKeyPrefix(enData, 'PLACEHOLDER').forEach(([key, val]) => {
    //         test(`${key} is visible`, () => {
    //             render(<App lang="en" />)
    //             expect(screen.getByPlaceholderText(val)).toBeVisible()
    //         })
    //     })
    // })
    // describe('Spanish Language', () => {
    //     /*
    //       👉 TASK 3

    //       This is done after making the UI multilingual.
    //     */
    //     const espData = langData.esp;
    //     // getByText
    //     [
    //         'TEXT_HEADING_CREATE_ACCOUNT',
    //         'TEXT_FAV_LANG',
    //         'TEXT_OPT_FAV_FOOD_1',
    //         'TEXT_OPT_FAV_FOOD_2',
    //         'TEXT_OPT_FAV_FOOD_3',
    //         'TEXT_OPT_FAV_FOOD_4',
    //         'TEXT_SUBMIT'
    //     ].forEach(key => {
    //         test(`${key} is visible`, () => {
    //             render(<App lang="esp" />)
    //             expect(screen.getByText(espData[key])).toBeVisible()
    //         })
    //     });
    //     // getByLabelText
    //     [
    //         'LABEL_USERNAME',
    //         'TEXT_FAV_LANG_JS',
    //         'TEXT_FAV_LANG_RUST',
    //         'LABEL_FAV_FOOD',
    //         'LABEL_ACCEPT_TERMS'
    //     ].forEach(key => {
    //         test(`${key} is visible`, () => {
    //             render(<App lang="esp" />)
    //             expect(screen.getByLabelText(espData[key])).toBeVisible()
    //         })
    //     })
    //     // getByPlaceholderText
    //     test('PLACEHOLDER_USERNAME is visible', () => {
    //         render(<App lang="esp" />)
    //         expect(screen.getByPlaceholderText(espData.PLACEHOLDER_USERNAME)).toBeVisible()
    //     })
    // })
    describe('getEntriesByKeyPrefix', () => {
        test('can extract the correct data', () => {
            /*
              👉 TASK 4 part 2
        
              Implement the function `getEntriesByKeyPrefix` below
              and then come back here and write a few tests
              to ensure it works as expected.
        
              Although it should be noted that commonly,
              the tests are written _before_ implementing
              the function being tested.
            */
            const test_data = {
                abc_1: "data_abc_1",
                abc_2: "data_abc_2",
                xyz_1: "data_xyz_1",
                abc_3: "data_abc_3"
            }
            expect(getEntriesByKeyPrefix(test_data, 'abc')).toEqual([
                ["abc_1", "data_abc_1"],
                ["abc_2", "data_abc_2"],
                ["abc_3", "data_abc_3"]
            ])
            expect(getEntriesByKeyPrefix(test_data, 'xyz')).toEqual([
                ["xyz_1", "data_xyz_1"]
            ])
            expect(getEntriesByKeyPrefix(test_data, 'nul')).toEqual([])
        })
    })
})
function getEntriesByKeyPrefix(obj, keyPrefix) {
    /*
      👉 TASK 4 part 1
  
      Implement a function that takes as first argument an object `obj` such as this:
  
      {
        abc_1: "data_abc_1",
        abc_2: "data_abc_2",
        xyz_1: "data_xyz_1",
        abc_3: "data_abc_3",
      }
  
      and takes as second argument a string `keyPrefix` such as this: "abc"
  
      and returns an array of arrays such as this (for the arguments given in the examples above):
  
      [
        ["abc_1", "data_abc_1"],
        ["abc_2", "data_abc_2"],
        ["abc_3", "data_abc_3"],
      ]
  
      If the function is passed the same `obj` as above but a `keyPrefix` of "xyz" then it would return:
  
      [
        ["xyz_1", "data_xyz_1"],
      ]
  
      If the function is passed the same `obj` as above but a `keyPrefix` of "foo" then it would return the empty array.
  
      The function looks inside the object `obj`, finds all properties whose property names begin
      with the `keyPrefix` given (followed by an underscore), and reorganizes the information before returning it.
      The properties that match the `keyPrefix` are returned inside an array holding key-value-pair sub-arrays.
  
    */
    const regex = new RegExp(`^${keyPrefix}_.*$`)
    let arr = []
    for (let key in obj) {
        if (key.match(regex)) arr.push([key, obj[key]])
    }
    return arr
}
