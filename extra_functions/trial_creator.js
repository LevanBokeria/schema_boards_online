function trial_creator() {

    let all_trials = []

    let images_to_conditions = jatos.studySessionData.inputData.images_to_conditions

    for (iCond of jatos.studySessionData.inputData.order_of_conditions) {
        // debugger

        console.log(jatos.studySessionData.inputData.order_of_conditions)
        console.log('Condition: ', iCond)

        let i_imgs_to_conditions = images_to_conditions[iCond]

        for (i_stage of ['schema_pa', 'new_pa']) {

            console.log(i_stage)

            let n_trials_per_pa = jatos.studySessionData.inputData.n_trials_per_pa[i_stage][i_stage][iCond]

            let istage_n_blocks = jatos.studySessionData.inputData.n_blocks_per_condition[i_stage][iCond]

            for (iBlock = 1; iBlock <= istage_n_blocks; iBlock++) {

                console.log('block: ', iBlock)
                // debugger

                // New PA coordinates are always the same 
                var all_pa_coords = {
                    schema_pa: [],
                    new_pa: []
                }

                all_pa_coords.new_pa = jatos.studySessionData.inputData.arrangements_to_conditions[iCond].filter(item => item.pa_type == 'new_pa' & item.condition == iCond)

                all_pa_coords.schema_pa = jatos.studySessionData.inputData.arrangements_to_conditions[iCond].filter(item => item.pa_type == 'schema_pa' & item.condition == iCond & item.block == iBlock & item.learning_stage == i_stage)

                // if (i_stage == 'new_pa'){

                //     // If its new pa learning, then, the schema_pas I want to see on the board should be from the previous block, i.e. block2

                //     all_pa_coords.schema_pa = jatos.studySessionData.inputData.arrangements_to_conditions[iCond].filter(item => item.pa_type == 'schema_pa' & item.condition == iCond & item.block == 2)

                // }

                var block_trials = []

                for (iPA = 0; iPA < i_imgs_to_conditions[i_stage].length; iPA++) {

                    //console.log('PA: ',iPA)

                    var i_pa_img = i_imgs_to_conditions[i_stage][iPA]

                    var i_pa_coords = all_pa_coords[i_stage][iPA]

                    let i_pa_type = i_stage

                    for (iRep = 0; iRep < n_trials_per_pa; iRep++) {
                        // debugger

                        var trial = {
                            pa_img: i_pa_img,
                            pa_type: i_pa_type,
                            pa_img_idx: iPA,
                            pa_img_coords: i_pa_coords,
                            stage: i_stage,
                            block: iBlock,
                            condition: iCond,
                            schema_pa_all_imgs: i_imgs_to_conditions.schema_pa,
                            new_pa_all_imgs: i_imgs_to_conditions.new_pa,
                            schema_pa_all_img_coords: all_pa_coords.schema_pa,
                            new_pa_all_img_coords: all_pa_coords.new_pa,
                            color: jatos.studySessionData.inputData.condition_colors[iCond],
                            color_name: jatos.studySessionData.inputData.condition_color_names[iCond],
                            top_offset: Math.floor(Math.random() * 160),
                            left_offset: Math.floor(Math.random() * 160)

                        }

                        block_trials.push(trial)

                    } // iRep

                } // iPA

                // Now, if its the new_pa learning stage, we also need to add schema-pa trials
                if (i_stage == 'new_pa') {
                    debugger
                    for (iPA = 0; iPA < i_imgs_to_conditions['schema_pa'].length; iPA++) {

                        //console.log('PA: ',iPA)

                        var i_pa_img = i_imgs_to_conditions['schema_pa'][iPA]

                        var i_pa_coords = all_pa_coords['schema_pa'][iPA]

                        let i_pa_type = 'schema_pa'

                        let n_trials_per_pa = jatos.studySessionData.inputData.n_trials_per_pa[i_stage]['schema_pa'][iCond]

                        for (iRep = 0; iRep < n_trials_per_pa; iRep++) {
                            // debugger

                            var trial = {
                                pa_img: i_pa_img,
                                pa_type: i_pa_type,
                                pa_img_idx: iPA,
                                pa_img_coords: i_pa_coords,
                                stage: i_stage,
                                block: iBlock,
                                condition: iCond,
                                schema_pa_all_imgs: i_imgs_to_conditions.schema_pa,
                                new_pa_all_imgs: i_imgs_to_conditions.new_pa,
                                schema_pa_all_img_coords: all_pa_coords.schema_pa,
                                new_pa_all_img_coords: all_pa_coords.new_pa,
                                color: jatos.studySessionData.inputData.condition_colors[iCond],
                                color_name: jatos.studySessionData.inputData.condition_color_names[iCond],
                                top_offset: Math.floor(Math.random() * 160),
                                left_offset: Math.floor(Math.random() * 160)

                            }

                            block_trials.push(trial)

                        } // iRep

                    } // iPA

                }

                if (iCond == 'practice') {
                    block_trials = jsPsych.randomization.shuffle(block_trials)
                } else if (i_stage == 'new_pa') {
                    // debugger
                    // Separately shuffle the new_pas and schema_pas so to avoid repeating the same img
                    let block_trials_new_pas = block_trials.filter(item => item.pa_type == 'new_pa')
                    let block_trials_schema_pas = block_trials.filter(item => item.pa_type == 'schema_pa')

                    block_trials_new_pas = jsPsych.randomization.shuffleNoRepeats(block_trials_new_pas, function (a, b) { return a.pa_img === b.pa_img })
                    block_trials_schema_pas = jsPsych.randomization.shuffleNoRepeats(block_trials_schema_pas, function (a, b) { return a.pa_img === b.pa_img })

                    // Now, alternate them
                    block_trials = []
                    let npa = block_trials_schema_pas.length

                    for (iPA = 0; iPA < npa; iPA++) {


                        block_trials.push(block_trials_schema_pas[0])
                        block_trials_schema_pas = block_trials_schema_pas.slice(1,block_trials_schema_pas.length)

                        block_trials.push(block_trials_new_pas[0])
                        block_trials.push(block_trials_new_pas[1])                        
                        block_trials_new_pas = block_trials_new_pas.slice(2,block_trials_new_pas.length)


                    }
                    // debugger
                } else {

                    // Make sure trials aren't back to back for the same image
                    block_trials = jsPsych.randomization.shuffleNoRepeats(block_trials, function (a, b) { return a.pa_img === b.pa_img })

                }

                // Add a key about the trial counter and random offset 
                // This isn't done in the above loop, because for some conditions the block_trials get shuffled!
                for (iT = 0; iT < block_trials.length; iT++) {
                    console.log(iT)
                    // Trial counter prompt
                    block_trials[iT]['trial_counter_prompt'] = '<p>Trial ' + (iT + 1) + '/' + block_trials.length + '</p>'

                    // Trial counter itself
                    block_trials[iT]['trial_counter'] = iT

                }
                // debugger
                all_trials.push(block_trials)

            } // iBlock

        }
    }
    // debugger

    return all_trials
}